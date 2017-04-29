import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  routeSub: Subscription;
  routeList: Route[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('/cau-bo/')) {
          this.routeList = [
            { routeName: 'Năng suất làm hàng', routeLink: ['cau-bo/nang-suat-lam-hang'] },
            { routeName: 'Thông báo lỗi', routeLink: ['/cau-bo/thong-bao-loi'] }
          ];
        }
        else if (event.urlAfterRedirects.includes('/cau-khung/')) {
          this.routeList = [
            { routeName: 'Theo dõi RTG', routeLink: ['/cau-khung/theo-doi-rtg'] },
            { routeName: 'Thông báo lỗi', routeLink: ['/cau-khung/thong-bao-loi'] }
          ];
        }
        else {
          this.routeList = [];
        } 
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}

class Route {
  routeName: string;
  routeLink: [string];
}