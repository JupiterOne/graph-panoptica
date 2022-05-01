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
import { createContainerEntity } from './converter';

export async function fetchContainers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateTelemetries(async (telemetry) => {
    for (const container of telemetry.pod.containers) {
      const containerEntity = await jobState.addEntity(
        createContainerEntity(telemetry.pod.id, container),
      );

      const clusterEntity = await jobState.findEntity(
        getClusterKey(telemetry.cluster.id),
      );

      if (clusterEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: clusterEntity,
            to: containerEntity,
          }),
        );
      }
    }
  });
}

export const containerSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.CONTAINERS,
    name: 'Fetch Containers',
    entities: [Entities.CONTAINER],
    relationships: [Relationships.CLUSTER_HAS_CONTAINER],
    dependsOn: [Steps.CLUSTERS],
    executionHandler: fetchContainers,
  },
];
