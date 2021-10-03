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
  product: any = {};
  category: any = {};
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
  ngOnInit(): void {


  }
}
