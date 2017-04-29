import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { LoggerService } from '../shared/logger.service';
import { environment } from '../../../environments/environment';

import { dbConfigProd, dbConfigDev } from './app-config';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserCredentials } from "app/shared/models/auth/UserCredentials";

declare var moment: any;


@Injectable()
export class AuthService {

  constructor(
    private af: AngularFire,
    private loggerService: LoggerService,
  ) { }

  login(credentials: UserCredentials) {
    return this.af.auth.login(credentials);
  }

  logout() {
    return this.af.auth.logout();
  }

  getAuth() {
    return this.af.auth;
  }

}

