import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { PanopticaUser } from '../../types';
import { Entities } from '../constants';

export function createUserEntity(user: PanopticaUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: `panoptica_user:${user.id}`,
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        id: user.id,
        name: user.fullName,
        username: user.fullName,
        accountId: user.accountId,
        lastLogin: parseTimePropertyValue(user.lastLogin),
        fullName: user.fullName,
        description: user.description || undefined,
        status: user.status,
        role: user.role,
        normalizedRole: user.normalizedRole,
        email: user.email || undefined,
        active: user.status === 'ENABLED',
      },
    },
  });
}
