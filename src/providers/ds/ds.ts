import { Injectable } from '@angular/core';

import * as deepstream from 'deepstream.io-client-js';

import 'rxjs/add/operator/map';

/*
  Generated class for the DsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DsProvider {

  private ds;
  public dsInstance;

  constructor() {
    this.ds = this.dsInstance = deepstream('dsio.dd.express:6020')
      .on('error', error => console.log(error));
  }

  login (credentials?, loginHandler?) {
    // Authenticate
    this.ds.login(credentials, loginHandler);
  }

  getRecord(name) {
    // Create or retrieve record
    return this.ds.record.getRecord(name);
  }

  getList(name){
    // Create or retrieve list
    return this.ds.record.getList(name);
  }

}
