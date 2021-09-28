import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService, ICategory } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  parametersObservable: any;
  category: ICategory;
  product :any= {};
  constructor(public http: HttpService, public route: ActivatedRoute, public cdr: ChangeDetectorRef, private router: Router) {
    this.parametersObservable = this.route.params.subscribe(params => {
       http.getProduct(+this.http.getParam(this.route, 'productId')).then((d) => {
         this.product = d;
         this.cdr.detectChanges();
         this.router.navigate([http.buildProductUrl(d)]);
      });
      //get product
      //let category = this.http.getCategory(this.product.CategoryId);
      //
    });
  }
  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
  ngOnInit(): void {


  }
}
