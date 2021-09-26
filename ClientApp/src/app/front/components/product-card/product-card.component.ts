import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-card1',
  templateUrl: './product-card1.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-product-card2',
  templateUrl: './product-card2.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
