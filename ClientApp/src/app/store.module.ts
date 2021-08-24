import { NgModule } from '@angular/core';
import { buildPath, TemplateModule } from '../../../../Santel/Core/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTypes, EntityConfiguration, PropertyConfiguration, WebSitesConfiguration } from '../../../../Santel/Core/ClientApp/src/app/services/utils';
import { AuthService } from '../../../../Santel/Core/ClientApp/src/app/services/auth.service';
import { WebSiteService } from '../../../../Santel/Core/ClientApp/src/app/services/website.service';
import { CategoryComponent, ColorComponent, ProductComponent, SizeComponent } from './pages/pages.component';
import { defaultPropertyWithTitleConfiguration, filesEntity } from '../../../../Santel/Core/ClientApp/src/app/services/properties';
import { Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileManagerComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/file-manager/file-manager.component';


export const config: WebSitesConfiguration = new WebSitesConfiguration('StoreDB', 'مدیریت وب سایت ', ' ',
  [
    new EntityConfiguration(CategoryComponent, 'Category', "دسته بندی", {
      componentType: ComponentTypes.tree,
      icon: '',
      treeParentKey: "ParentCategoryId",
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('ParentCategoryId', '  دسته بندی    ', {
          Validators: []
        }),
        new PropertyConfiguration('Logo', 'لوگو ', { Validators: [], InTable: true }),
        new PropertyConfiguration('Summary', 'خلاصه ', { Validators: [], InTable: true }),
        new PropertyConfiguration('Description', 'شرح  ', { Validators: [], InTable: true }),
      ]
    }),
    new EntityConfiguration(ProductComponent, 'Product', "محصولات", {
      neededData: { Categories: "Category", Colors: "Color", Sizes: "Size"},
      componentType: ComponentTypes.lazytable,
      icon: '',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('CategoryId', 'دسته بندی', { Validators: [Validators.required], InTable: true }),
        new PropertyConfiguration('Logo', 'لوگو ', { Validators: [], InTable: true }),
        new PropertyConfiguration('Summary', 'خلاصه ', { Validators: [], InTable: true }),
        new PropertyConfiguration('Description', 'شرح  ', { Validators: [], InTable: true }),
        new PropertyConfiguration('ProductLabels', 'لیبل ها  ', { value: [],Validators: [], InTable: true }),
        new PropertyConfiguration('ProductTypes', 'انواع  ', { value: [], Validators: [], InTable: true }),
        new PropertyConfiguration('ProductImages', 'تصاویر  ', { value: [], Validators: [], InTable: true }),
      ]
    }),
    new EntityConfiguration(ColorComponent, 'Color', "رنگ", {
      componentType: ComponentTypes.table,
      icon: '',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('Value', 'مقدار', { Type: 'color', Validators: [Validators.required], InTable: true }),
      ]
    }),
    new EntityConfiguration(SizeComponent, 'Size', "سایز بندی", {
      componentType: ComponentTypes.table,
      icon: '',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('Value', 'مقدار', { Type: 'string', Validators: [Validators.required], InTable: true   }),
      ]
    }),
    filesEntity,
    new EntityConfiguration(FileManagerComponent, 'FileManager','FileManager')
  ]
);
const routes: Routes = [
  ...config.entitiesConfiguration.map(c => ({ path: c.key.toLowerCase(), component: c.component, canActivate: [AuthService] }))
];


@NgModule({
  declarations: [
    CategoryComponent, ProductComponent, ColorComponent, SizeComponent
  ],
  imports: [
    TemplateModule, CKEditorModule,
    RouterModule.forChild(buildPath(routes, true))
  ]
})
export class StoreModule {
  constructor(wss: WebSiteService) {
    wss.websites.push(config);
    wss.selectedWebsite = config;
  }
}
