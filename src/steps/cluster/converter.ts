import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { CiscoSecureApplicationCluster } from '../../types';
import { Entities } from '../constants';

export function getClusterKey(id: string): string {
  return `cisco_secure_application_cluster:${id}`;
}

export function createClusterEntity(
  cluster: CiscoSecureApplicationCluster,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: cluster,
      assign: {
        _key: getClusterKey(cluster.id),
        _type: Entities.CLUSTER._type,
        _class: Entities.CLUSTER._class,
        id: cluster.id,
        name: cluster.name,
        clusterPodDefinitionSource: cluster.clusterPodDefinitionSource,
        ciImageValidation: cluster.ciImageValidation,
        restrictRegistires: cluster.restrictRegistires,
        preserveOriginalSourceIp: cluster.preserveOriginalSourceIp,
        isPersistent: cluster.isPersistent,
        isMultiCluster: cluster.isMultiCluster,
        enableConnectionsControl: cluster.enableConnectionsControl,
        proxyConfigurationEnableProxy: cluster.proxyConfiguration.enableProxy,
        proxyConfigurationHttpsProxy: cluster.proxyConfiguration.httpsProxy,
        agentFailClose: cluster.agentFailClose,
        serviceDiscoveryIsolationEnabled:
          cluster.serviceDiscoveryIsolationEnabled,
        isHoldApplicationUntilProxyStarts:
          cluster.isHoldApplicationUntilProxyStarts,
        isIstioIngressEnabled: cluster.isIstioIngressEnabled,
        tokenInjectionEnabled: cluster.tokenInjectionEnabled,
        automatedPolicyRequiresDeployer:
          cluster.automatedPolicyRequiresDeployer,
        autoLabelEnabled: cluster.autoLabelEnabled,
        tlsInspectionEnabled: cluster.tlsInspectionEnabled,
        tracingSupportSettingsInstallTracingSupport:
          cluster.tracingSupportSettings.installTracingSupport,
        tracingSupportSettingsTraceAnalyzerEnabled:
          cluster.tracingSupportSettings.traceAnalyzerEnabled,
        tracingSupportSettingsSpecReconstructorEnabled:
          cluster.tracingSupportSettings.specReconstructorEnabled,
        istioInstallationParametersIsIstioAlreadyInstalled:
          cluster.istioInstallationParameters.isIstioAlreadyInstalled,
        istioInstallationParametersIstioVersion:
          cluster.istioInstallationParameters.istioVersion,
        internalRegistryParametersInternalRegistryEnabled:
          cluster.internalRegistryParameters.internalRegistryEnabled,
        externalCaId: cluster.externalCa.id || undefined,
        externalCaName: cluster.externalCa.name || undefined,
        apiIntelligenceDAST: cluster.apiIntelligenceDAST,
        autoUpdateEnabled: cluster.autoUpdateEnabled,
        orchestrationType: cluster.orchestrationType,
        minimalNumberOfControllerReplicas:
          cluster.minimalNumberOfControllerReplicas,
      },
    },
  });
}
