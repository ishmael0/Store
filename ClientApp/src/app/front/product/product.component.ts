import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { icons } from '../../../../../../Santel/Core/ClientApp/src/app/services/icon';

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
