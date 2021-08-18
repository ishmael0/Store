import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { toTreeHelper } from '../../../../../Core/ClientApp/src/app/services/utils';
import { BaseComponent } from '../../../../../Core/ClientApp/src/app/template/base/base.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


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
  Editor = ClassicEditor;
  categoryTree: any;
  async ngOnInit() {
    await super.ngOnInit();
    this.categoryTree = toTreeHelper(this.dataManager.loadedData.Categories, "Id", "ParentCategoryId", null);
  }

  addType(item: FormGroup) {
    let x = item.controls.ProductTypes.value;
    x.push({
      Price: 0,
      Off: 0,
      TotalPriceAfterOff: 0,
      Amount: 0,
      Sells: 0,
    });
    item.controls.ProductTypes.setValue(x);
    this.cdr.detectChanges();
  }
  delType(item: FormGroup, t: any) {
    let x = item.controls.ProductTypes.value.filter(c => c != t);
    item.controls.ProductTypes.setValue(x);
    this.cdr.detectChanges();
  }
  dropType(event: any, item: FormGroup): void {
    let x = item.controls.ProductTypes.value;
    moveItemInArray(x, event.previousIndex, event.currentIndex);
  }

  dropImage(event: any, item: FormGroup): void {
    let x = item.controls.ProductImages.value;
    moveItemInArray(x, event.previousIndex, event.currentIndex);
  }

  async addImage(e) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().controls.ProductImages.value;
    x.push({ Path: e, Description: '' });
    this.selectedForm().controls.ProductImages.markAsDirty();
    this.selectedForm().controls.ProductImages.updateValueAndValidity();
  }

}
