import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const clusterSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://securecn.cisco.com/api/kubernetesClusters
     * PATTERN: Fetch Entities
     */
    id: 'fetch-clusters',
    name: 'Fetch Clusters',
    entities: [
      {
        resourceName: 'Cluster',
        _type: 'panoptica_cluster',
        _class: ['Cluster'],
      },
    ],
    relationships: [
      {
        _type: 'panoptica_account_has_cluster',
        sourceType: 'panoptica_account',
        _class: RelationshipClass.HAS,
        targetType: 'panoptica_cluster',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
