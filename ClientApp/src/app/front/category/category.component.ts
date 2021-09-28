import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService, ICategory } from '../http.service';
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
    this.parametersObservable = this.route.params.subscribe(async params => {
      this.category = this.http.getCategory(+this.http.getParam(this.route, 'categoryId'));
      if (await this.router.navigate([this.http.buildCategoryUrl(this.category.Id)]) !== false) {
        this.products = await this.http.getProducts(this.category.Id);
        this.cdr.detectChanges();
      }
    });
  }
  category: ICategory;
  async ngOnInit(): Promise<void> {
  }
  products: any[] = [];
  viewType = 3;
  params: any = { SortType: 'B' };
  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
}
