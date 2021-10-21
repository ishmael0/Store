import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { HTTPTypes, RequestPlus, toTreeHelper } from '../../../../../Santel/Core/ClientApp/src/app/services/utils';
import { BaseComponent } from '../../../../../Santel/Core/ClientApp/src/app/template/base/base.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { HttpRequestService } from '../../../../../Santel/Core/ClientApp/src/app/services/http-request.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Invoice');
  }
  provinces: any[];
  Cities: any[];
  fill() {
    this.provinces = this.dataManager.loadedData["Provinces"];
    this.Cities = this.dataManager.loadedData["Cities"];
  }
  customerIdModal = false;
  customerIdModalSelected(e: any) {
    let item = this.selectedForm();
    item.controls.CustomerId.setValue(e.Id);
    item.controls.LastName.setValue(e.LastName);
    item.controls.FirstName.setValue(e.FirstName);
    this.customerIdModal = false;
  }
}
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvinceComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Province');
  }
}
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'City');
  }
  provinces: any[];
  fill() {
    this.provinces = this.dataManager.loadedData["Provinces"];
  }
  async onGet(m: string, d: any) {
    super.onGet(m, d);
    this.dataManager.ViewRecords.forEach(c => {
      let t = this.provinces.find(d => d.Id == c.ProvinceId);
      c.ProvinceId_ = t.Title;
    })
  }
}
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Size');
  }
}
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Color');
  }
}


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Label');
  }
  async set(back = false) {
    let item = this.selectedForm();
    let x: any[] = item.controls.ProductLabels.value;
    x.forEach((c, index) => c.Priority = index);
    await super.set(back);
  }
  onOpen(m: string, d: any, item: any) {
    console.log(item);
    item.ProductLabels = d.List;
    super.onOpen(m, d, item);
  }
  inModal = false;
  productSelected(e: any) {
    let item = this.selectedForm();
    let x = item.controls.ProductLabels.value;
    let y = { ProductId: e.Id, LabelId: 0, Priority: 0, Title: e.Title };
    if (!x) {
      item.controls.ProductLabels.setValue([y]);
      this.makeItDirty(item);
    }
    else if (!x.some(c => c.ProductId == e.Id)) {
      x.push(y);
      item.controls.ProductLabels.setValue(x);
      this.makeItDirty(item);
    }
  }
}


@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Keyword');
  }
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Category');
  }
  loadFile(e: any, item: FormGroup) {
    console.log(e);
    var reader = new FileReader();
    var myFile = e.target.files[0];
    reader.addEventListener('load', function (e) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(e.target.result.toString(), 'text/html');
      var svg = doc.getElementsByTagName('svg');
      while (true) {
        let x = svg[0].getElementsByTagName('text');
        if (x.length == 0) break;
        x[0].parentNode.removeChild(x[0]);
      }
      item.controls.Icon.setValue(svg[0].outerHTML);
    });
    reader.readAsBinaryString(myFile);
    e.target.value = ''

  }
  config = {
    language: 'fa'
  }
  Editor = ClassicEditor;
  imageModal = false;
  dropImage(event: any, item: FormGroup): void {
    let x = item.controls.Images.value;
    moveItemInArray(x, event.previousIndex, event.currentIndex);
  }
  async addImage(e) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().controls.Images.value;
    x.push({ Path: e, Description: '' });
    this.makeItDirty(this.selectedForm());
  }
  addFirst(item: FormGroup) {
    let max = item.controls.DetailsNodeValuesMaxId.value + 1;
    item.controls.DetailsNodeValuesMaxId.setValue(max);

    if (!item.controls.TreeNodes.value || item.controls.TreeNodes.value.length == 0) {
      item.controls.TreeNodes.setValue([{ key: max, Name: '' }]);
    }
    else {
      item.controls.TreeNodes.setValue([...item.controls.TreeNodes.value, { key: max, Name: '' }]);
    }


    this.makeItDirty(item);
  }
  removeNode(item: FormGroup, e: NzTreeNode) {
    console.log(e, item.controls.TreeNodes.value);
    if (e.level == 0) {
      let x = item.controls.TreeNodes.value;
      item.controls.TreeNodes.setValue(x.filter(c => c != e.origin))
    }
    else {
      let parent = e.parentNode;
      e.remove();
    }
    this.makeItDirty(item);
  }

  addNode(item: FormGroup, e: NzTreeNode) {
    if (!e.children) {
      e.children = [];
    }
    let max = item.controls.DetailsNodeValuesMaxId.value + 1;
    item.controls.DetailsNodeValuesMaxId.setValue(max);
    e.addChildren([{ key: max, Name: '', isLeaf: true }]);
    e.isExpanded = true;
    e.setExpanded(true);
    this.makeItDirty(item);
  }
  TypeChanged(e:any, origin) {
    console.log(e);
    if (e == 'SelectT') origin.Items = ['بله', 'خیر'];
    if (e == 'SelectH') origin.Items = ['دارد', 'ندارد'];
    if (e == 'Select') origin.Items = [ ];
  }
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Product');
  }
  config = {
    language: 'fa'
  }
  imageModal = false;
  labelModal = false;
  keywordModal = false;
  relatedModal = false;
  Editor = ClassicEditor;
  categoryTree: any;
  categories: any[];

  onOpen(m: string, d: any, item: any) {
    console.log(d);
    item.Types = d.Types;
    item.ProductLabels = d.ProductLabels;
    let labels = this.dataManager.loadedData["Labels"]
    item.ProductLabels.forEach(c => {
      c.Title = labels.find(d => d.Id == c.LabelId).Title
    });
    item.ProductKeyWords = d.ProductKeyWords;
    super.onOpen(m, d, item);
  }


  fill() {
    this.categoryTree = toTreeHelper(this.dataManager.loadedData.Categories, "Id", "ParentCategoryId", null);
    this.categories = this.dataManager.loadedData["Categories"];
  }
  async onGet(m: string, d: any) {
    super.onGet(m, d);
    this.dataManager.ViewRecords.forEach(c => {
      let mycat = this.categories.find(d => d.Id == c.CategoryId);
      c.Category_ = mycat.Title;
      if (!c.DetailsNodeValues) c.DetailsNodeValues = {};
      c.DetailsNodeValuesLength = Object.keys(c.DetailsNodeValues).length;
    })
  }
  addType(item: FormGroup, e: any = null) {
    let x = item.controls.Types.value;
    let n: any = {};
    let id = 0;
    if (e == null) {
      n = {
        Id: id,
        Price: 0,
        Off: 0,
        TotalPriceAfterOff: 0,
        SupplyCount: 0,
        SoldCount: 0,
        MaxAllowedBuy: 0,
        Status: 'Active'
      };
    }
    else {
      n = { ...e, ...{ Id: id } };
    }
    item.controls.Types.setValue([...x, n]);
    this.makeItDirty(item);
  }
  delType(item: FormGroup, t: any) {
    let x = item.controls.Types.value.filter(c => c != t);
    item.controls.Types.setValue(x);
    this.makeItDirty(item);
  }
  relatedProductSelected(e: any) {
    let item = this.selectedForm();
    if (!item.controls.Relateds.value?.some(c => c.Id == e.Id)) {
      item.controls.Relateds.setValue([...item.controls.Relateds.value, { Id: e.Id, Title: e.Title }]);
      this.makeItDirty(item);
    }
  }
  keywordSelected(e: any) {
    let item = this.selectedForm();
    if (!item.controls.KeyWords.value?.some(c => c.Id == e.Id)) {
      item.controls.KeyWords.setValue([...item.controls.KeyWords.value, { Id: e.Id, Title: e.Title }]);
      this.makeItDirty(item);
    }
  }
  labelSelected(e: any) {
    let item = this.selectedForm();
    let x = item.controls.ProductLabels.value;
    let y = { LabelId: e.Id, Title: e.Title };
    if (!x) {
      item.controls.ProductLabels.setValue([y]);
      this.makeItDirty(item);
    }
    else if (!x.some(c => c.ProductId == e.Id)) {
      x.push(y);
      item.controls.ProductLabels.setValue(x);
      this.makeItDirty(item);
    }
  }

  async addImage(e) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().controls.Images.value;
    x.push({ Path: e, Description: '' });
    this.selectedForm().controls.Images.markAsDirty();
    this.selectedForm().controls.Images.updateValueAndValidity();
  }
  getCatNodes(id: number) {
    return this.categories.find(c => c.Id == id).TreeNodes;
  }
  countNodes(item: FormGroup, controlName: string) {
    return Object.keys(item.controls[controlName].value).length;
  }
}




@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Customer');
  }
}

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderedListComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'OrderedList');
  }
  relatedModal = false;
}
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent extends BaseComponent {
  constructor(public injector: Injector) {
    super(injector, 'Brand');
  }
  imageModal = false;
  dropImage(event: any, item: FormGroup): void {
    let x = item.controls.Images.value;
    moveItemInArray(x, event.previousIndex, event.currentIndex);
  }
  async addImage(e) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().controls.Images.value;
    x.push({ Path: e, Description: '' });
    this.makeItDirty(this.selectedForm());
  }
}


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [
    `   .nz-badge-card {
        width: 150px;
        color:black;
        height: 50px;
        border-radius: 4px;
        background: #eee;
        padding:10px;
        padding-top: 20px;
        vertical-align: middle;
      }
.mainwelcome{
}
.mainwelcome nz-badge{
margin:10px;
}
`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  constructor(public http: HttpRequestService, public cdr: ChangeDetectorRef) {
  }
  async ngOnInit() {
    await this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'welcome', {
      action: 'Init', onSuccess: (m, d) => {
        this.res.Categories = d.Categories;
        this.res.Customers = d.Customers;
        this.res.Products = d.Products;
        this.res.Brands = d.Brands;
      }
    }));
    this.cdr.detectChanges();
  }
  res: any = {};


}
