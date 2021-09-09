import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import { HttpService } from '../http.service';

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

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

}
