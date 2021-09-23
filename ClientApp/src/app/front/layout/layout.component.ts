import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation,ChangeDetectorRef} from '@angular/core';
import { HttpService } from '../http.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { icons } from '../../../../../../Santel/Core/ClientApp/src/app/services/icon';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',

  styles: [
    `
`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
//  encapsulation: ViewEncapsulation.ShadowDom
})
export class LayoutComponent implements OnInit {

  constructor(public http: HttpService,public cdr: ChangeDetectorRef) { }
  loading = true;
  async ngOnInit() {
    await this.http.init();
    this.loading = false;
    this.cdr.detectChanges();
  }
  customOptions: OwlOptions = {
    dots: true,
    loop: true,
    center: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    navText: ['>', '<'],
    rtl: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
    }
  }
}
