import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const riskSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://securecn.cisco.com/api/riskAssessment
     * PATTERN: Fetch Entities
     */
    id: 'fetch-risks',
    name: 'Fetch Risks',
    entities: [
      {
        resourceName: 'Risk',
        _type: 'cisco_secure_application_risk',
        _class: ['Risk'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: N/A
     * PATTERN: Build Child Relationship
     */
    id: 'build-cluster-risk-relationship',
    name: 'Build Cluster Risk Relationship',
    entities: [],
    relationships: [
      {
        _type: 'cisco_secure_application_cluster_has_risk',
        sourceType: 'cisco_secure_application_cluster',
        _class: RelationshipClass.HAS,
        targetType: 'cisco_secure_application_risk',
      },
    ],
    dependsOn: ['fetch-clusters', 'fetch-risks'],
    implemented: true,
  },
];
