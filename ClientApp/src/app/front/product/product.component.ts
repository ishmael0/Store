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


@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styles: [
      `.main{padding: 2px; text-align: initial; display: flex;  flex-direction: row;  flex-wrap: wrap;  width: 100%;position:relative;}
      .main img{max-width:50px;margin-left:5px;display: flex; flex-direction: column; flex-basis: 100%; flex: 1; }
      .close{float:left;display:none;margin-top:20px;color:red;position:absolute;left:5px}
      .main:hover .close{display:block}
      .main:hover {background-color:#e5e5e5}
`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() hasPrice: boolean = true;
  @Input() hasCount: boolean = true;
  constructor() { }
  icons = icons;
  ngOnInit(): void {
  }

}
