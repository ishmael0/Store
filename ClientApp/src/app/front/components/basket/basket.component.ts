import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

}
