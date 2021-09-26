import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../http.service';
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
  constructor(public http: HttpService, public route: ActivatedRoute, public cdr: ChangeDetectorRef, private router: Router) {
    this.parametersObservable = this.route.params.subscribe(params => {
      let productId = +this.http.getParam(this.route, 'productId');
      //get product
      let category = this.http.findCategoryInTree(this.http.data.categoriesTree, 1);



      this.router.navigate(['product/' + productId + "/" + category.title + "/"+ "هویج/"])




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
