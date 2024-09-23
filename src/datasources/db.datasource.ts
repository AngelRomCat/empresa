import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'mysql',
  url: 'mysql://avnadmin:AVNS_Bcssy-AilPlMjEBnhfm@mysql-c4552d6-rom-c5a0.d.aivencloud.com:14556/empresa?ssl-mode=REQUIRED',
  host: 'mysql-c4552d6-rom-c5a0.d.aivencloud.com',
  port: 14556,
  user: 'avnadmin',
  password: 'AVNS_Bcssy-AilPlMjEBnhfm',
  database: 'empresa'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
