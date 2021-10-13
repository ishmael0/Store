import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService, ICategory } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  parametersObservable: any;
  product: any = undefined;
  category: any = undefined;
  constructor(public http: HttpService, public route: ActivatedRoute, public cdr: ChangeDetectorRef, private router: Router) {
    this.parametersObservable = this.route.params.subscribe(async params => {
      let id = +this.http.getParam(this.route, 'productId');
      this.product = await http.getProduct(id);
      if (await this.router.navigate([http.buildProductUrl(this.product)]) !== false) {
        this.category = http.getCategory(this.product.CategoryId);
        this.cdr.detectChanges();
      }
    });
  }
  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
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
  ngOnInit(): void {


  }
}
