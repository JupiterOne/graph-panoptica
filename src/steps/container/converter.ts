import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { CiscoSecureApplicationContainer } from '../../types';
import { Entities } from '../constants';

export function getContainerKey(podId: string, containerTag: string): string {
  return `cisco_secure_application_container:${podId}:${containerTag}`;
}

export function createContainerEntity(
  podId: string,
  container: CiscoSecureApplicationContainer,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: { podId, ...container },
      assign: {
        _key: getContainerKey(podId, container.image.tag),
        _type: Entities.CONTAINER._type,
        _class: Entities.CONTAINER._class,
        name: container.image.tag,
        repository: container.image.repository,
        tag: container.image.tag,
        hash: container.image.hash || undefined,
        vulnerabilitySeverityLevel:
          container.image.vulnerabilitySeverityLevel || undefined,
        dockerfileScanSeverity:
          container.image.dockerfileScanSeverity || undefined,
      },
    },
  });
}
