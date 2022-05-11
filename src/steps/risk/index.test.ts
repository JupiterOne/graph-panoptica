import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-risks', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-risks',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.RISKS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('build-cluster-risk-relationship', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'build-cluster-risk-relationship',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.CLUSTER_RISK);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
