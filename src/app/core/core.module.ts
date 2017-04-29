import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { ToastrModule } from 'toastr-ng2';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { dbConfigProd } from './shared/app-config';
import { LoggerService } from './shared/logger.service';
import { AuthService } from './shared/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(dbConfigProd.firebase, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }),
    ToastrModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    ToolbarComponent
  ],
  providers: [
    LoggerService,
    AuthService
  ],
  exports: [
    NavbarComponent,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
