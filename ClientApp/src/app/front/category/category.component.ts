import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  parametersObservable: any;

  constructor(public http: HttpService, public route: ActivatedRoute, public cdr: ChangeDetectorRef, private router: Router) {
    this.parametersObservable = this.route.params.subscribe(params => {
      let categoryId = +this.http.getParam(this.route, 'categoryId');
      this.category = this.http.findCategoryInTree(this.http.data.categoriesTree, categoryId);
      let categoryName = this.http.getParam(this.route, 'categoryName');
      if (!categoryName || categoryName != this.category.title) {
        this.router.navigate(['category/' + categoryId + "/" + this.category.title])
      }
    });
  }

  category: any = {};
  ngOnInit(): void {

  }
  viewType = 2;
  params: any = { SortType: 'B' };
  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
}
