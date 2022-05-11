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
        _type: 'cisco_secure_application_cluster',
        _class: ['Cluster'],
      },
    ],
    relationships: [
      {
        _type: 'cisco_secure_application_account_has_cluster',
        sourceType: 'cisco_secure_application_account',
        _class: RelationshipClass.HAS,
        targetType: 'cisco_secure_application_cluster',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
