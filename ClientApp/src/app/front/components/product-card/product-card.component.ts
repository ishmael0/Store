import { Component, OnInit, ChangeDetectionStrategy,Input, Directive } from '@angular/core';
import { HttpService } from '../../http.service';

@Directive()
export class ProductCardBase implements OnInit {
  @Input() product;
  constructor(public http: HttpService) {
  }
  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-product-card1',
  templateUrl: './product-card1.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard1Component extends ProductCardBase{
  constructor(public http: HttpService) {
    super(http);
  }
 
}
@Component({
  selector: 'app-product-card2',
  templateUrl: './product-card2.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard2Component extends ProductCardBase {
  constructor(public http: HttpService) {
    super(http);
  }
  
}
@Component({
  selector: 'app-product-card3',
  templateUrl: './product-card3.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard3Component extends ProductCardBase {
  constructor(public http: HttpService) {
    super(http);
  }
  
}
