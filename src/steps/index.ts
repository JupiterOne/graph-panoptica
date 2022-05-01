import { accountSteps } from './account';
import { clusterSteps } from './cluster';
import { containerSteps } from './container';
import { imageSteps } from './image';
import { riskSteps } from './risk';
import { userSteps } from './user';
import { vulnerabilitySteps } from './vulnerability';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...clusterSteps,
  ...imageSteps,
  ...vulnerabilitySteps,
  ...riskSteps,
  ...containerSteps,
];

export { integrationSteps };
