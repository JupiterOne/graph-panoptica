import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { CiscoSecureApplicationAccount } from '../../types';
import { Entities } from '../constants';

export function createAccountEntity(
  account: CiscoSecureApplicationAccount,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: account,
      assign: {
        _key: `cisco_secure_application_account:${account.id}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: account.fullName,
        accountId: account.accountId,
        lastLogin: account.lastLogin,
        fullName: account.fullName,
        description: account.description || undefined,
        status: account.status,
        role: account.role,
        email: account.email || undefined,
        shouldDisplayEula: account.shouldDisplayEula,
        shouldDisplayProductTour: account.shouldDisplayProductTour,
        permissionsMode: account.permissionsMode,
        accountTier: account.accountTier,
        pricingUnitType: account.pricingUnitType,
        apiSecurity: account.apiSecurity,
        serverlessSecurity: account.serverlessSecurity,
        usageStatusCurrentNodesUsage: account.usageStatus.currentNodesUsage,
        usageStatusMaxNodes: account.usageStatus.maxNodes,
        usageStatusCurrentClustersUsage:
          account.usageStatus.currentClustersUsage,
        usageStatusMaxClusters: account.usageStatus.maxClusters,
      },
    },
  });
}
