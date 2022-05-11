import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const containerSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://securecn.cisco.com/api/appTelemetry
     * PATTERN: Fetch Entities
     */
    id: 'fetch-containers',
    name: 'Fetch Containers',
    entities: [
      {
        resourceName: 'Container',
        _type: 'cisco_secure_application_container',
        _class: ['Container'],
      },
    ],
    relationships: [
      {
        _type: 'cisco_secure_application_cluster_has_container',
        sourceType: 'cisco_secure_application_cluster',
        _class: RelationshipClass.HAS,
        targetType: 'cisco_secure_application_container',
      },
    ],
    dependsOn: ['fetch-clusters'],
    implemented: true,
  },
];
