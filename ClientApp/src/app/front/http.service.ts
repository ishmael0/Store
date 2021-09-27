import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { icons } from '../../../../../Santel/Core/ClientApp/src/app/services/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toTreeHelper } from '../../../../../Santel/Core/ClientApp/src/app/services/utils';
import { ActivatedRoute } from '@angular/router';

export interface IDataInterFace {
  isInitilized: boolean;
  categories: any[];
  categoriesTree: any[];
  products: any[];
}
@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {
  getProduct(productId: number)  {
       
  }

  constructor(handler: HttpHandler, public ns: NzNotificationService, public domSanitizer: DomSanitizer) {
    super(handler);
  }
  icons = icons;
  fixUrl(str: string) {
    return str.replace(" ", "_");
  }
  buildCategoryUrl(category: any) {
    return 'category/' + category.Id + "/" + this.fixUrl(category.Title) + "/";
  }
  buildProductUrl(product: any) {
    return 'product/' + product.Id + "/" + this.fixUrl(product.Title) + "/"
  }
  findCategoryInTree(tree: any[], id: number) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].data.Id == id) return tree[i];
      let x = this.findCategoryInTree(tree[i].children, id);
      if (x) return x;
    }
    return null;
  }
  getParam(route: ActivatedRoute, p: string) {
    return route.snapshot.paramMap.get(p)
  }
  async init() {
    if (this.data.isInitilized) return;
    let x: any = await this.get('api/Front/GetInitial').toPromise();
    this.data.categories = x.categories;
    this.data.categories.forEach(c => {
      c.Icon = this.domSanitizer.bypassSecurityTrustHtml(c.Icon);
    });
    this.data.categoriesTree = toTreeHelper(x.categories, 'Id', 'ParentCategoryId', null);
  }
  data: Partial<IDataInterFace> = { isInitilized: false };
}
