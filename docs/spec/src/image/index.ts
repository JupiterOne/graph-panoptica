import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const imageSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://securecn.cisco.com/api/images
     * PATTERN: Fetch Entities
     */
    id: 'fetch-images',
    name: 'Fetch Images',
    entities: [
      {
        resourceName: 'Image',
        _type: 'panoptica_image',
        _class: ['Image'],
      },
    ],
    relationships: [
      {
        _type: 'panoptica_account_has_image',
        sourceType: 'panoptica_account',
        _class: RelationshipClass.HAS,
        targetType: 'panoptica_image',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
