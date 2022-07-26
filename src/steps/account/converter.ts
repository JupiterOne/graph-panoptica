import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createAccountEntity(email: string): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        email,
      },
      assign: {
        _key: `panoptica_account:${email}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: email,
        email,
      },
    },
  });
}
