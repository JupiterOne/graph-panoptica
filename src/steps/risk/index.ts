import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { getClusterKey } from '../cluster/converter';
import { Steps, Entities, Relationships } from '../constants';
import { createRiskEntity } from './converter';

export async function fetchRisks({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateRisks(async (risk) => {
    await jobState.addEntity(createRiskEntity(risk));
  });
}

export async function buildClusterRiskRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.RISK._type },
    async (riskEntity) => {
      const clusterEntity = await jobState.findEntity(
        getClusterKey(riskEntity.clusterId as string),
      );

      if (clusterEntity)
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: clusterEntity,
            to: riskEntity,
          }),
        );
    },
  );
}

export const riskSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.RISKS,
    name: 'Fetch Risks',
    entities: [Entities.RISK],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRisks,
  },
  {
    id: Steps.CLUSTER_RISK,
    name: 'Build Cluster Risk Relationship',
    entities: [],
    relationships: [Relationships.CLUSTER_HAS_RISK],
    dependsOn: [Steps.CLUSTERS, Steps.RISKS],
    executionHandler: buildClusterRiskRelationship,
  },
];
