import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://securecn.cisco.com/api/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'panoptica_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'panoptica_account_has_user',
        sourceType: 'panoptica_account',
        _class: RelationshipClass.HAS,
        targetType: 'panoptica_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
