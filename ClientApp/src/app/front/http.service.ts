import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { icons } from '../../../../../Santel/Core/ClientApp/src/app/services/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { deepCopy, toTreeHelper } from '../../../../../Santel/Core/ClientApp/src/app/services/utils';
import { ActivatedRoute } from '@angular/router';

export interface IDataInterFace {
  isInitilized: boolean;
  categories: ICategory[];
  categoriesTree: any[];
  SearchableTreeNodes: any[];
  products: any;
}
export interface ICategory {
  Searchs: any[];
  Title: string;
  Description: string;
  Icon: string;
  IconSanitizer: SafeHtml;
  Summary: string;
  Color: string;
  Id: number;
  Priority: number;
  TreeNodes: any[];
  Images: IImage[];
  ParentCategoryId: number;
}
export interface IImage {
  Path: string;
  Description: string;
}
export interface IAppDate {
  url: string;
  ShortName: string;
  FullName: string;
  logo: string;
}


@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {
  AppDate: IAppDate = {
    logo:'',
    url: 'moniza.ir',
    ShortName: 'moniza',
    FullName:'moniza'
  };
  icons = icons;
  ///category
  buildCategoryUrl(id: number) {
    let category = this.getCategory(id);
    return '/category/' + category.Id + "/" + this.fixUrl(category.Title) + "/";
  }
  getCategory(id: number) {
     return this.data.categories.find(c => c.Id == id) ?? null;
  }
  findCategoryInTree(id: number, tree: any[] = null) {
    if (tree == null) tree = this.data.categoriesTree;
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].data.Id == id) return tree[i];
      let x = this.findCategoryInTree(id, tree[i].children);
      if (x) return x;
    }
    return null;
  }
  getAllCategoriesInCategory(id: number) {
    let list: number[] = [];
    let listToCheck: number[] = [];
    listToCheck.push(id);
    while (listToCheck.length > 0) {
      let i = listToCheck.pop();
      let cat = this.getCategory(i);
      listToCheck.push(...this.data.categories.filter(c => c.ParentCategoryId == cat.Id).map(c => c.Id));
      list.push(cat.Id)
    }
    return list;
  }
  ///product
  buildProductUrl(product: any) {
    let cat = this.getCategory(product.CategoryId);
    return '/product/' + product.Id + "/" + this.fixUrl(cat.Title + "_" + product.Title) + "/"
  }
  async getProducts(categoryId: number) {
    let x: any = await this.post('api/Front/GetProducts', {
      Categories: this.getAllCategoriesInCategory(categoryId)
    }).toPromise();
    x.products.forEach(c => this.data.products[c.Id] = c);
    return x.products;
  }
  async getProduct(id: number) {
    if (this.data.products[id]) {
      return this.data.products[id];
    }
    else {
      let x: any = await this.post('api/Front/GetProduct', {
        Id: id
      }).toPromise();
      this.data.products[id] = x.product;
      return x.product;
    }
  }
  ///other
  fixUrl(str: string) {
    return str.replace(" ", "_");
  }
  getParam(route: ActivatedRoute, p: string) {
    return route.snapshot.paramMap.get(p)
  }



  constructor(handler: HttpHandler, public ns: NzNotificationService, public domSanitizer: DomSanitizer) {
    super(handler);
  }
  async init() {
    if (this.data.isInitilized) return;
    let x: any = await this.get('api/Front/GetInitial').toPromise();
    this.data.categories = x.categories;
    this.data.categories.forEach(c => {
      c.IconSanitizer = this.domSanitizer.bypassSecurityTrustHtml(c.Icon);
      c.Searchs = c.TreeNodes?.filter(d => d.Searchable == true).map(d => ({Type :d.Type, key:d.key,name:d.name, Items:d.Items }))
    });
    this.data.categoriesTree = toTreeHelper(x.categories, 'Id', 'ParentCategoryId', null);
    console.log(this.data.categoriesTree)
    for (var i = 0; i < this.data.categoriesTree.length; i++) {
      this.data.categoriesTree[i].flag = true;
      for (var j = 0; j < this.data.categoriesTree[i].children.length; j++) {
        let x = this.data.categoriesTree[i].children[j];
        if (x && x.children && x.children.length > 0)
          this.data.categoriesTree[i].flag =  false;
      }
    }


  }
  data: Partial<IDataInterFace> = {
    isInitilized: false, products: {}
  };
}
