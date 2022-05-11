import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { CiscoSecureApplicationImage } from '../../types';
import { Entities } from '../constants';

export function createImageEntity(image: CiscoSecureApplicationImage): Entity {
  return createIntegrationEntity({
    entityData: {
      source: image,
      assign: {
        _key: `cisco_secure_application_image:${image.id}`,
        _type: Entities.IMAGE._type,
        _class: Entities.IMAGE._class,
        id: image.id,
        name: image.imageName,
        imageTags: image.imageTags,
        imageHash: image.imageHash,
        vulnerabilitiesSummaryTotal: image.vulnerabilitiesSummary.total,
        vulnerabilitiesSummaryUnknown: image.vulnerabilitiesSummary.unknown,
        vulnerabilitiesSummaryLow: image.vulnerabilitiesSummary.low,
        vulnerabilitiesSummaryMedium: image.vulnerabilitiesSummary.medium,
        vulnerabilitiesSummaryHigh: image.vulnerabilitiesSummary.high,
        vulnerabilitiesSummaryCritical: image.vulnerabilitiesSummary.critical,
        isScanned: image.isScanned,
        isIdentified: image.isIdentified,
        imageSourceType: image.imageSourceType,
        dockerfileScanResultsSummaryTotal:
          image.dockerfileScanResultsSummary.total,
        dockerfileScanResultsSummaryInfo:
          image.dockerfileScanResultsSummary.info,
        dockerfileScanResultsSummaryWarn:
          image.dockerfileScanResultsSummary.warn,
        dockerfileScanResultsSummaryFatal:
          image.dockerfileScanResultsSummary.fatal,
        createdOn: parseTimePropertyValue(image.timeAdded),
      },
    },
  });
}
