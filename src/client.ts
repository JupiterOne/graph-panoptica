import Escher from 'escher-auth';
import fetch, { Response } from 'node-fetch';
import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import { retry } from '@lifeomic/attempt';

import { IntegrationConfig } from './config';
import {
  CiscoSecureApplicationAccount,
  CiscoSecureApplicationCluster,
  CiscoSecureApplicationImage,
  CiscoSecureApplicationRisk,
  CiscoSecureApplicationTelemetry,
  CiscoSecureApplicationUser,
  CiscoSecureApplicationVulnerability,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private host = 'securecn.cisco.com';
  private baseUri = `https://${this.host}/api`;
  private credentialScope = 'global/services/portshift_request';
  private withBaseUri = (path: string) => `${this.baseUri}/${path}`;
  private escher = new Escher({
    credentialScope: this.credentialScope,
    accessKeyId: this.config.accessKey,
    apiSecret: this.config.secretKey,
  });

  private getDate(): string {
    const date = new Date().toISOString().replace(/[^0-9a-zA-Z]+/g, '');
    return date.slice(0, 15) + date.slice(18);
  }
  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(path: string, method?: 'GET'): Promise<Response> {
    try {
      const options = {
        host: this.host,
        port: 443,
        method: 'GET',
        url: `/api/${path}`,
        headers: [
          ['X-Escher-Date', this.getDate()],
          ['host', this.host],
          ['content-type', 'application/json'],
        ],
      };

      const signedRequest = this.escher.signRequest(options, '');

      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(
            this.withBaseUri(path),
            signedRequest,
          );
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: this.withBaseUri(path),
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    try {
      await this.request('me');
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: this.withBaseUri('me'),
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  public async getCurrentUser(): Promise<CiscoSecureApplicationAccount> {
    return this.request('me');
  }

  public async iterateUsers(
    iteratee: ResourceIteratee<CiscoSecureApplicationUser>,
  ): Promise<void> {
    const users = await this.request('users');

    for (const user of users) {
      await iteratee(user);
    }
  }

  public async iterateClusters(
    iteratee: ResourceIteratee<CiscoSecureApplicationCluster>,
  ): Promise<void> {
    const clusters = await this.request('kubernetesClusters');

    for (const cluster of clusters) {
      await iteratee(cluster);
    }
  }

  public async iterateImages(
    iteratee: ResourceIteratee<CiscoSecureApplicationImage>,
  ): Promise<void> {
    const images = await this.request('images');

    for (const image of images) {
      await iteratee(image);
    }
  }

  public async iterateVulnerabilities(
    imageId: string,
    iteratee: ResourceIteratee<CiscoSecureApplicationVulnerability>,
  ): Promise<void> {
    const vulnerabilities = await this.request(
      `images/${imageId}/vulnerabilities`,
    );

    for (const vulnerability of vulnerabilities) {
      await iteratee(vulnerability);
    }
  }

  public async iterateRisks(
    iteratee: ResourceIteratee<CiscoSecureApplicationRisk>,
  ): Promise<void> {
    const risks = await this.request('riskAssessment');

    for (const risk of risks) {
      await iteratee(risk);
    }
  }

  public async iterateTelemetries(
    iteratee: ResourceIteratee<CiscoSecureApplicationTelemetry>,
  ): Promise<void> {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    const telemetries: CiscoSecureApplicationTelemetry[] = await this.request(
      `appTelemetries?sortKey=appName&sortDir=ASC&startTime=${startDate.toISOString()}&endTime=${new Date().toISOString()}`,
    );

    for (const telemetry of telemetries) {
      await iteratee(telemetry);
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
