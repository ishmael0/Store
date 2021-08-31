import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
