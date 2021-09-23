import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-mini-card',
  templateUrl: './product-mini-card.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMiniCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
