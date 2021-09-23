import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  parametersObservable: any;

  constructor(public http: HttpService, public route: ActivatedRoute, public cdr: ChangeDetectorRef) {
    this.parametersObservable = this.route.params.subscribe(params => {
      let id = +this.http.getParam(this.route, 'categoryId');
      this.category = this.http.findCategoryInTree(this.http.data.categoriesTree, id);
      console.log(this.category)
    });
  }

  category: any = {};
  ngOnInit(): void {

  }
  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
}
