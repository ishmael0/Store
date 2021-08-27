import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { toTreeHelper } from '../../../../../Santel/Core/ClientApp/src/app/services/utils';
import { BaseComponent } from '../../../../../Santel/Core/ClientApp/src/app/template/base/base.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzTreeNode } from 'ng-zorro-antd/tree';


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
    this.selectedForm().controls.Images.markAsDirty();
    this.selectedForm().controls.Images.updateValueAndValidity();
  }
  addFirst(item) {
    item.controls.TreeNodes.setValue([{ key: 1, Name: '' }]);
    let max = item.controls.DetailsNodeValuesMaxId.value + 1;
    item.controls.DetailsNodeValuesMaxId.setValue(max);

    this.makeItDirty(item);
  }
  removeNode(item: FormGroup, e: NzTreeNode) {
    e.remove();
    this.makeItDirty(item);
  }

  addNode(item: FormGroup, e: NzTreeNode) {
    if (!e.children) {
      e.children = [];
    }
    let max = item.controls.DetailsNodeValuesMaxId.value + 1;
    item.controls.DetailsNodeValuesMaxId.setValue(max);
    e.addChildren([{ key: max, Name: '' }]);
    e.isExpanded = true;
    e.setExpanded(true);

    this.makeItDirty(item);
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
  keywordModal = false;
  relatedModal = false;
  Editor = ClassicEditor;
  categoryTree: any;
  categories: any[];
  async ngOnInit() {
    await super.ngOnInit();
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
  addType(item: FormGroup) {
    let x = item.controls.Types.value;
    x.push({
      Price: 0,
      Off: 0,
      TotalPriceAfterOff: 0,
      Amount: 0,
      Sells: 0,
    });
    item.controls.Types.setValue(x);
    this.cdr.detectChanges();
  }
  delType(item: FormGroup, t: any) {
    let x = item.controls.Types.value.filter(c => c != t);
    item.controls.Types.setValue(x);
    this.cdr.detectChanges();
  }
  deleteFromList(item: FormGroup, controlName: string, keyValue: any, key = 'Id') {
    let x = item.controls[controlName].value.filter(c => c[key] != keyValue);
    item.controls.Types.setValue(x);
    this.makeItDirty(item);
  }
  relatedProductSelected(e: any) {
    let item = this.selectedForm();
    if (!item.controls.Related.value?.some(c => c.Id == e.Id)) {
      item.controls.Related.setValue([...item.controls.Related.value, { Id: e.Id, Title: e.Title }]);
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

}
