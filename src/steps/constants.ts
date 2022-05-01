import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  CLUSTERS: 'fetch-clusters',
  IMAGES: 'fetch-images',
  VULNERABILITIES: 'fetch-vulnerabilities',
  RISKS: 'fetch-risks',
  CLUSTER_RISK: 'build-cluster-risk-relationship',
  CLOUD_ACCOUNTS: 'fetch-cloud-accounts',
  CONTAINERS: 'fetch-containers',
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'CLUSTER'
  | 'USER'
  | 'IMAGE'
  | 'VULNERABILITY'
  | 'RISK'
  | 'CONTAINER'
  | 'CLOUD-ACCOUNT',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'cisco_secure_application_account',
    _class: ['Account'],
  },
  CLUSTER: {
    resourceName: 'Cluster',
    _type: 'cisco_secure_application_cluster',
    _class: ['Cluster'],
  },
  IMAGE: {
    resourceName: 'Image',
    _type: 'cisco_secure_application_image',
    _class: ['Image'],
  },
  USER: {
    resourceName: 'User',
    _type: 'cisco_secure_application_user',
    _class: ['User'],
  },
  VULNERABILITY: {
    resourceName: 'Vulnerability',
    _type: 'cisco_secure_application_vulnerability',
    _class: ['Vulnerability'],
  },
  RISK: {
    resourceName: 'Risk',
    _type: 'cisco_secure_application_risk',
    _class: ['Risk'],
  },
  'CLOUD-ACCOUNT': {
    resourceName: 'Cloud Account',
    _type: 'cisco_secure_application_cloud_account',
    _class: ['Service'],
  },
  CONTAINER: {
    resourceName: 'Container',
    _type: 'cisco_secure_application_container',
    _class: ['Container'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_USER'
  | 'ACCOUNT_HAS_CLUSTER'
  | 'ACCOUNT_HAS_IMAGE'
  | 'ACCOUNT_HAS_CLOUD_ACCOUNT'
  | 'IMAGE_HAS_VULNERABILITY'
  | 'CLUSTER_HAS_CONTAINER'
  | 'CLUSTER_HAS_RISK',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'cisco_secure_application_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_CLUSTER: {
    _type: 'cisco_secure_application_account_has_cluster',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.CLUSTER._type,
  },
  ACCOUNT_HAS_IMAGE: {
    _type: 'cisco_secure_application_account_has_image',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.IMAGE._type,
  },
  IMAGE_HAS_VULNERABILITY: {
    _type: 'cisco_secure_application_image_has_vulnerability',
    sourceType: Entities.IMAGE._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.VULNERABILITY._type,
  },
  CLUSTER_HAS_RISK: {
    _type: 'cisco_secure_application_cluster_has_risk',
    sourceType: Entities.CLUSTER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.RISK._type,
  },
  CLUSTER_HAS_CONTAINER: {
    _type: 'cisco_secure_application_cluster_has_container',
    sourceType: Entities.CLUSTER._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.CONTAINER._type,
  },
  ACCOUNT_HAS_CLOUD_ACCOUNT: {
    _type: 'cisco_secure_application_account_has_cloud_account',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities['CLOUD-ACCOUNT']._type,
  },
};
