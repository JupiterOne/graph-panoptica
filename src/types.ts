export type CiscoSecureApplicationAccount = {
  id: string;
  accountId: string;
  lastLogin: string;
  fullName: string;
  description?: string;
  status: string;
  role: string;
  email?: string;
  shouldDisplayEula: boolean;
  shouldDisplayProductTour: boolean;
  permissionsMode: string;
  accountTier: string;
  pricingUnitType: string;
  apiSecurity: string;
  serverlessSecurity: string;
  usageStatus: {
    currentNodesUsage: number;
    maxNodes: number;
    currentClustersUsage: number;
    maxClusters: number;
  };
};

export type CiscoSecureApplicationUser = {
  id: string;
  accountId: string;
  lastLogin: string;
  fullName: string;
  description?: string;
  status: string;
  role: string;
  normalizedRole: string;
  email: string;
};

export type CiscoSecureApplicationCluster = {
  id: string;
  name: string;
  clusterPodDefinitionSource: string;
  ciImageValidation: boolean;
  restrictRegistires: boolean;
  preserveOriginalSourceIp: boolean;
  isPersistent: boolean;
  isMultiCluster: boolean;
  enableConnectionsControl: boolean;
  proxyConfiguration: {
    enableProxy: boolean;
    httpsProxy: string;
  };
  agentFailClose: boolean;
  serviceDiscoveryIsolationEnabled: boolean;
  isHoldApplicationUntilProxyStarts: boolean;
  isIstioIngressEnabled: boolean;
  tokenInjectionEnabled: boolean;
  automatedPolicyRequiresDeployer: boolean;
  autoLabelEnabled: boolean;
  tlsInspectionEnabled: boolean;
  tracingSupportSettings: {
    installTracingSupport: boolean;
    traceAnalyzerEnabled: boolean;
    specReconstructorEnabled: boolean;
  };
  istioInstallationParameters: {
    isIstioAlreadyInstalled: boolean;
    istioVersion: string;
  };
  internalRegistryParameters: {
    internalRegistryEnabled: boolean;
  };
  externalCa: {
    id?: string;
    name?: string;
  };
  apiIntelligenceDAST: boolean;
  autoUpdateEnabled: boolean;
  orchestrationType: string;
  minimalNumberOfControllerReplicas: number;
};

export type CiscoSecureApplicationImage = {
  id: string;
  imageName: string;
  imageTags: string[];
  imageHash: string;
  timeAdded: string;
  vulnerabilitiesSummary: {
    total: number;
    unknown: number;
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  isScanned: boolean;
  isIdentified: boolean;
  imageSourceType: string;
  dockerfileScanResultsSummary: {
    total: number;
    info: number;
    warn: number;
    fatal: number;
  };
};

export type CiscoSecureApplicationVulnerability = {
  id: string;
  name: string;
  description: string;
  link: string;
  severity: string;
  cvss: {
    score: number;
    attackVector: string;
    attackComplexity: string;
    privilegesRequired: string;
    userInteraction: string;
    scope: string;
    confidentialityImpact: string;
    integrityImpact: string;
    availabilityImpact: string;
  };
  vulnerabilitySources: {
    fixAvailability: string;
    sources: {
      packageName: string;
      packageVersion: string;
      fixVersion: string;
    }[];
  };
  layerName: string;
};

export type CiscoSecureApplicationRisk = {
  id: string;
  time: string;
  total: number;
  scanned: number;
  clusterId: string;
  clusterName: string;
  status: string;
  vulnerabilitiesSummary: {
    total: number;
    unknown: number;
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  dockerfileScanResultsSummary: {
    total: number;
    info: number;
    warn: number;
    fatal: number;
  };
  scanConfig: {
    namespaces: string[];
    maxParallelism: number;
    minimumSeverity: string;
    periodicJobExpression: {
      PeriodicJobType: string;
    };
    runDockerfileScan: boolean;
  };
  hasFailed: boolean;
};

export type CiscoSecureApplicationContainer = {
  image: {
    repository: string;
    tag: string;
    hash?: string;
    vulnerabilitySeverityLevel?: string;
    dockerfileScanSeverity?: string;
  };
};

export type CiscoSecureApplicationTelemetry = {
  pod: {
    id: string;
    name: string;
    labels: {
      key: string;
      value: string;
    }[];
    containers: CiscoSecureApplicationContainer[];
    initContainers: [
      {
        image: {
          repository: string;
          tag: string;
          hash?: string;
          vulnerabilitySeverityLevel?: string;
          dockerfileScanSeverity?: string;
        };
      },
    ];
    isIdentified: boolean;
    isProtected: boolean;
    kind: string;
    podDefinitionSource: string;
    permissionOwnerName: string;
  };
  cluster: {
    id: string;
    name: string;
  };
};
