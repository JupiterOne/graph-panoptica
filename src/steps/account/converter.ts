import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createAccountEntity(accountName: string): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        accountName,
      },
      assign: {
        _key: `panoptica_account:${accountName}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: accountName,
      },
    },
  });
}
