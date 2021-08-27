import { NgModule } from '@angular/core';
import { buildPath, TemplateModule } from '../../../../Santel/Core/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTypes, EntityConfiguration, PropertyConfiguration, WebSitesConfiguration } from '../../../../Santel/Core/ClientApp/src/app/services/utils';
import { AuthService } from '../../../../Santel/Core/ClientApp/src/app/services/auth.service';
import { WebSiteService } from '../../../../Santel/Core/ClientApp/src/app/services/website.service';
import { CategoryComponent, ColorComponent, KeywordComponent, ProductComponent, SizeComponent } from './pages/pages.component';
import { defaultPropertyWithTitleConfiguration, filesEntity } from '../../../../Santel/Core/ClientApp/src/app/services/properties';
import { Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileManagerComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/file-manager/file-manager.component';
import { IconsComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/icons/icons.component';
//import { FileManagerComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/file-manager/file-manager.component';
//import { IconsComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/icons/icons.component';


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
        new PropertyConfiguration('Images', 'تصاویر  ', { Validators: [], InTable: true }),
        new PropertyConfiguration('TreeNodes', 'جزیات محصولات در این دسته بندی  ', { Validators: [], InTable: true }),
        new PropertyConfiguration('DetailsNodeValuesMaxId', 'DetailsNodeValuesMaxId  ', { value: 0, Validators: [], InTable: false }),
      ]
    }),
    new EntityConfiguration(ProductComponent, 'Product', "محصولات", {
      neededData: { Categories: "Category", Colors: "Color", Sizes: "Size"},
      componentType: ComponentTypes.lazytable,
      icon: '',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('CategoryId', 'دسته بندی', { Validators: [Validators.required], InTable: true, InPicker: true }),
        new PropertyConfiguration('Supply', 'تعداد موجودی ', { Validators: [], InTable: true, InPicker: true }),
        new PropertyConfiguration('Images', 'تصاویر  ', { value: [], Validators: [], InTable: true }),
        new PropertyConfiguration('Summary', 'خلاصه ', { Validators: [], InTable: false }),
        new PropertyConfiguration('Description', 'شرح  ', { Validators: [], InTable: false }),
        new PropertyConfiguration('Labels', 'لیبل ها  ', { value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('Related', 'مرتبط  ', { value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('Types', 'انواع  ', { value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('DetailsNodeValues', 'ویژگی ها', { value: {}, Validators: [], InTable: false }),
        new PropertyConfiguration('KeyWords', ' کلید واژه ها', { value: [], Validators: [], InTable: false   }),
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
    new EntityConfiguration(KeywordComponent, 'Keyword', "کلیدواژه", {
      componentType: ComponentTypes.lazytable,
      icon: '',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration
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
    new EntityConfiguration(FileManagerComponent, 'FileManager', 'FileManager'),
    new EntityConfiguration(IconsComponent, 'Icons', 'Icons')
  ]
);
const routes: Routes = [
  ...config.entitiesConfiguration.map(c => ({ path: c.key.toLowerCase(), component: c.component, canActivate: [AuthService] }))
];


@NgModule({
  declarations: [
    CategoryComponent, ProductComponent, ColorComponent, SizeComponent, KeywordComponent
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
