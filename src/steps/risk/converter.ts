import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { CiscoSecureApplicationRisk } from '../../types';
import { Entities } from '../constants';

export function createRiskEntity(risk: CiscoSecureApplicationRisk): Entity {
  return createIntegrationEntity({
    entityData: {
      source: risk,
      assign: {
        _key: `cisco_secure_application_risk:${risk.id}`,
        _type: Entities.RISK._type,
        _class: Entities.RISK._class,
        id: risk.id,
        name: `${risk.clusterName} Risk`,
        probability: 0,
        impact: risk.total,
        score: risk.total,
        time: parseTimePropertyValue(risk.time),
        total: risk.total,
        scanned: risk.scanned,
        clusterId: risk.clusterId,
        clusterName: risk.clusterName,
        status: risk.status,
        'vulnerabilitiesSummary.total': risk.vulnerabilitiesSummary.total,
        'vulnerabilitiesSummary.unknown': risk.vulnerabilitiesSummary.unknown,
        'vulnerabilitiesSummary.low': risk.vulnerabilitiesSummary.low,
        'vulnerabilitiesSummary.medium': risk.vulnerabilitiesSummary.medium,
        'vulnerabilitiesSummary.high': risk.vulnerabilitiesSummary.high,
        'vulnerabilitiesSummary.critical': risk.vulnerabilitiesSummary.critical,
        'dockerfileScanResultsSummary.total':
          risk.dockerfileScanResultsSummary.total,
        'dockerfileScanResultsSummary.info':
          risk.dockerfileScanResultsSummary.info,
        'dockerfileScanResultsSummary.warn':
          risk.dockerfileScanResultsSummary.warn,
        'dockerfileScanResultsSummary.fatal':
          risk.dockerfileScanResultsSummary.fatal,
        'scanConfig.namespaces': risk.scanConfig?.namespaces,
        'scanConfig.maxParallelism': risk.scanConfig?.maxParallelism,
        'scanConfig.minimumSeverity': risk.scanConfig?.minimumSeverity,
        'scanConfig.periodicJobExpression.periodicJobType':
          risk.scanConfig?.periodicJobExpression?.PeriodicJobType,
        'scanConfig.runDockerfileScan': risk.scanConfig?.runDockerfileScan,
        hasFailed: risk.hasFailed,
      },
    },
  });
}
