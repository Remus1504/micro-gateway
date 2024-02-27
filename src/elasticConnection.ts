import { winstonLogger } from '@remus1504/micrograde';
import { Logger } from 'winston';
import { config } from './configuration';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'apiGatewayElasticConnection',
  'debug',
);

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`,
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;
    while (!isConnected) {
      log.info('GatewayService Connecting to ElasticSearch');
      try {
        const healthCheck: ClusterHealthResponse =
          await this.elasticSearchClient.cluster.health({});
        log.info(
          `GatewayService ElasticSearch health status - ${healthCheck.status}`,
        );
        isConnected = true;
      } catch (error) {
        log.error('Connection to ElasticSearch failed, Retrying...');
        log.log(
          'error',
          'GatewayService checkConnection() method error:',
          error,
        );
      }
    }
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();
