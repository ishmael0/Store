import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
