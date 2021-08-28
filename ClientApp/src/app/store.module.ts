import { NgModule } from '@angular/core';
import { buildPath, TemplateModule } from '../../../../Santel/Core/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTypes, EntityConfiguration, PropertyConfiguration, WebSiteConfiguration } from '../../../../Santel/Core/ClientApp/src/app/services/utils';
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




export const config: WebSiteConfiguration = new WebSiteConfiguration('StoreDB', 'مدیریت وب سایت ', ' ',
  [
    new EntityConfiguration(CategoryComponent, 'Category', "دسته بندی", {
      componentType: ComponentTypes.tree,
      icon: 'shape',
      useDefaultIDStatusForm:false,
      treeParentKey: "ParentCategoryId",
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('ParentCategoryId', '  دسته بندی    ', {
          Validators: []
        }),
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
      icon: 'archive-check-outline',
      useDefaultIDStatusForm: false,
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('CategoryId', 'دسته بندی', { Type: 'custom', Validators: [Validators.required], InTable: true, InPicker: true }),
        new PropertyConfiguration('Supply', 'تعداد موجودی ', { Type: 'number', Validators: [], InTable: true, InPicker: true }),
        new PropertyConfiguration('Images', 'تصاویر  ', { value: [], Validators: [], InTable: true }),
        new PropertyConfiguration('Summary', 'خلاصه ', { Type: 'string', Validators: [], InTable: false }),
        new PropertyConfiguration('Description', 'شرح  ', { Type: 'string', Validators: [], InTable: false }),
        new PropertyConfiguration('Labels', 'لیبل ها  ', { Type: 'custom',value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('Related', 'مرتبط  ', { Type: 'custom',value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('Types', 'انواع  ', { Type: 'custom', value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('DetailsNodeValues', 'ویژگی ها', { Type: 'custom', value: {}, Validators: [], InTable: false }),
        new PropertyConfiguration('KeyWords', ' کلید واژه ها', { Type: 'custom', value: [], Validators: [], InTable: false }),
      ]
    }),
    new EntityConfiguration(ColorComponent, 'Color', "رنگ", {
      componentType: ComponentTypes.table,
      icon: 'palette',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('Value', 'مقدار', { Type: 'color', Validators: [Validators.required], InTable: true }),
      ]
    }),
    new EntityConfiguration(KeywordComponent, 'Keyword', "کلیدواژه", {
      componentType: ComponentTypes.lazytable,
      icon: 'signature-text',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration
      ]
    }),
    new EntityConfiguration(SizeComponent, 'Size', "سایز بندی", {
      componentType: ComponentTypes.table,
      icon: 'resize-bottom-right',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('Value', 'مقدار', { Type: 'string', Validators: [Validators.required], InTable: true   }),
      ]
    }),
    filesEntity,
    new EntityConfiguration(FileManagerComponent, 'FileManager', 'FileManager', { icon: 'folder' }),
    new EntityConfiguration(IconsComponent, 'Icons', 'Icons', { icon:'format-list-checkbox' })
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
