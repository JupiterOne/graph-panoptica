import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Steps, Entities, Relationships } from '../constants';
import { createImageEntity } from './converter';

export async function fetchImages({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateImages(async (image) => {
    const imageEntity = await jobState.addEntity(createImageEntity(image));

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: imageEntity,
      }),
    );
  });
}

export const imageSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.IMAGES,
    name: 'Fetch Images',
    entities: [Entities.IMAGE],
    relationships: [Relationships.ACCOUNT_HAS_IMAGE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchImages,
  },
];
