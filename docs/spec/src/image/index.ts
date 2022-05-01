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
        _type: 'cisco_secure_application_image',
        _class: ['Image'],
      },
    ],
    relationships: [
      {
        _type: 'cisco_secure_application_account_has_image',
        sourceType: 'cisco_secure_application_account',
        _class: RelationshipClass.HAS,
        targetType: 'cisco_secure_application_image',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
