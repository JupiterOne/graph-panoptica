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
        _type: 'panoptica_container',
        _class: ['Container'],
      },
    ],
    relationships: [
      {
        _type: 'panoptica_cluster_has_container',
        sourceType: 'panoptica_cluster',
        _class: RelationshipClass.HAS,
        targetType: 'panoptica_container',
      },
    ],
    dependsOn: ['fetch-clusters'],
    implemented: true,
  },
];
