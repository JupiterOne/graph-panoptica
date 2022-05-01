import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-containers', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-containers',
    options: {
      matchRequestsBy: {
        url: {
          query: false,
        },
      },
    },
  });

  const stepConfig = buildStepTestConfigForStep(Steps.CONTAINERS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
