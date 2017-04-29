import { Injectable, Inject } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { environment } from '../../../environments/environment';

import { dbConfigProd, dbConfigDev } from '../../core/shared/app-config';

declare var moment: any;
const MAX_RECORDS = 10000000;

@Injectable()
export class StsMonitorProductivityService {

  constructor(
    private af: AngularFire,
  ) { }

  getLogsRealtime() {
    let fbQuery = {
      query: {
        limitToLast: 100,
      }
    }

    return this.af.database.list(`${this.resolveProductivityLogsRef()}`, fbQuery)
  }

  getLogsWithinRange(start: string, end: string) {
    let fbQuery = {
      query: {
        orderByChild: 'start',
        startAt: start,
        endAt: end,
        limitToLast: MAX_RECORDS
      }
    }

    return this.af.database.list(`${this.resolveProductivityLogsRef()}`, fbQuery);
  }

  resetDatabase() {
    return this.af.database.list(`${this.resolveProductivityLogsRef()}`)
      .remove();
  }

  resolveProductivityLogsRef() {
    return (environment.production)
      ? dbConfigProd.fbRefStsProductivityLogs
      : dbConfigDev.fbRefStsProductivityLogs;
  }

}