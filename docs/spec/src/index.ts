import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { clusterSpec } from './cluster';
import { containerSpec } from './container';
import { imageSpec } from './image';
import { riskSpec } from './risk';
import { userSpec } from './user';
import { vulnerabilitySpec } from './vulnerability';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...userSpec,
    ...clusterSpec,
    ...imageSpec,
    ...vulnerabilitySpec,
    ...riskSpec,
    ...containerSpec,
  ],
};
