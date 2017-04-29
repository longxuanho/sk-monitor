import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'cau-bo', loadChildren: 'app/+sts/sts.module#StsModule' },
  { path: 'cau-khung', loadChildren: 'app/+rtg/rtg.module#RtgModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }

export const routedComponents = [
]