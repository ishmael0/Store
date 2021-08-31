import { NgModule } from '@angular/core';
import { buildPath, TemplateModule } from '../../../../../Santel/Core/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTypes, EntityConfiguration, PropertyConfiguration, WebSiteConfiguration } from '../../../../../Santel/Core/ClientApp/src/app/services/utils';
import { AuthService } from '../../../../../Santel/Core/ClientApp/src/app/services/auth.service';
import { WebSiteService } from '../../../../../Santel/Core/ClientApp/src/app/services/website.service';
import { CategoryComponent, CityComponent, ColorComponent, CustomerComponent, InvoiceComponent, KeywordComponent, ProductComponent, ProvinceComponent, SizeComponent } from './pages.component';
import { defaultPropertyConfiguration, defaultPropertyWithTitleConfiguration, filesEntity } from '../../../../../Santel/Core/ClientApp/src/app/services/properties';
import { Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileManagerComponent } from '../../../../../Santel/Core/ClientApp/src/app/template/components/file-manager/file-manager.component';
import { IconsComponent } from '../../../../../Santel/Core/ClientApp/src/app/template/components/icons/icons.component';
//import { FileManagerComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/file-manager/file-manager.component';
//import { IconsComponent } from '../../../../Santel/Core/ClientApp/src/app/template/components/icons/icons.component';
import { FormGroup } from '@angular/forms';




export const config: WebSiteConfiguration = new WebSiteConfiguration('StoreDB', 'مدیریت وب سایت ', ' ',
  [
    new EntityConfiguration(CategoryComponent, 'Category', "دسته بندی", {
      componentType: ComponentTypes.tree,
      icon: 'shape',
      useDefaultIDStatusForm: false,
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
      neededData: { Categories: "Category", Colors: "Color", Sizes: "Size" },
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
        new PropertyConfiguration('Labels', 'لیبل ها  ', { Type: 'custom', value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('Relateds', 'مرتبط  ', { Type: 'custom', value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('Types', 'انواع  ', { Type: 'custom', value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('DetailsNodeValues', 'ویژگی ها', { Type: 'custom', value: {}, Validators: [], InTable: false }),
        new PropertyConfiguration('KeyWords', ' کلید واژه ها', { Type: 'custom', value: [], Validators: [], InTable: false }),
        new PropertyConfiguration('MaxTypeId', 'MaxTypeId', { Type: 'custom', value: 0, Validators: [], InTable: false }),
        new PropertyConfiguration('Weight', '   وزن', { Type: 'custom', value: [], Validators: [], InTable: false }),
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
        new PropertyConfiguration('Value', 'مقدار', { Type: 'string', Validators: [Validators.required], InTable: true }),
      ]
    }),
    new EntityConfiguration(ProvinceComponent, 'Province', "استان ", {
      componentType: ComponentTypes.table,
      icon: 'city',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration
      ]
    }),

    new EntityConfiguration(CityComponent, 'City', "شهرستان ", {
      neededData: { Provinces: "Province" },
      componentType: ComponentTypes.table,
      icon: 'home-city',
      propertiesConfigurations: [
        ...defaultPropertyWithTitleConfiguration,
        new PropertyConfiguration('ProvinceId', 'استان ', { Type: 'custom', Validators: [Validators.required], InTable: true }),
      ]
    }),

    new EntityConfiguration(InvoiceComponent, 'Invoice', "فاکتور ", {
      componentType: ComponentTypes.lazytable,
      getTitle: (item: FormGroup) => {
        let x = (item.controls.CustomerId.value ? item.controls.CustomerId.value.toString() : "") + (item.controls.FirstName.value ? item.controls.FirstName.value : "") + " " + (item.controls.LastName.value ? item.controls.LastName.value : "")
        if (x && x != " ") return x;
        return "جدید";
      },
      icon: 'receipt',
      propertiesConfigurations: [
        ...defaultPropertyConfiguration,
        new PropertyConfiguration('CustomerId', 'شناسه مشتری', { Type: 'custom', Validators: [Validators.required], InTable: true, disabled: true }),
        new PropertyConfiguration('FirstName', 'نام', { Type: 'string', Validators: [Validators.required], InTable: true }),
        new PropertyConfiguration('LastName', 'نام خانوادگی', { Type: 'string', Validators: [Validators.required], InTable: true }),
        new PropertyConfiguration('Price', 'مبلغ ', { Type: 'number', value: 0, Validators: [Validators.required], InTable: true, disabled: true }),
        new PropertyConfiguration('PostPrice', 'هزینه ارسال', { value: 0, Type: 'number', Validators: [Validators.required], InTable: true }),
        new PropertyConfiguration('IsPaid', ' آیا پرداخت شده است؟', { value: false, Type: 'bool', Validators: [], InTable: true }),
        new PropertyConfiguration('Address', '', { value: {}, Type: 'custom', Validators: [], InTable: false }),
        new PropertyConfiguration('Description', '', { value: '', Type: 'string', Validators: [], InTable: false }),
        new PropertyConfiguration('ProductTypes', '', { value: [], Type: 'custom', Validators: [], InTable: false }),
      ]
    }),
    new EntityConfiguration(CustomerComponent, 'Customer', "مشتری ها ", {
      getTitle: (item: FormGroup) => {
        let x = (item.controls.FirstName.value ? item.controls.FirstName.value : "") + " " + (item.controls.LastName.value ? item.controls.LastName.value : "")
        if (x && x != " ") return x;
        return "جدید";
      },
      componentType: ComponentTypes.lazytable,
      icon: 'account-cash-outline',
      propertiesConfigurations: [
        ...defaultPropertyConfiguration,
        new PropertyConfiguration('FirstName', 'نام', { Type: 'string', Validators: [Validators.required], InPicker: true, InTable: true }),
        new PropertyConfiguration('LastName', 'نام خانوادگی', { Type: 'string', Validators: [Validators.required], InPicker: true, InTable: true }),
        new PropertyConfiguration('Password', 'گذرواژه ', { Type: 'string', Validators: [Validators.required], InTable: false }),
        new PropertyConfiguration('PhoneNumber', 'تلفن همراه', { Type: 'string', Validators: [], InPicker: true, InTable: true }),
        new PropertyConfiguration('PhoneNumberConfirm', 'تلفن همراه تایید شده است؟', { value: false, Type: 'bool', Validators: [Validators.required], InTable: false }),
        new PropertyConfiguration('Addresses', '', { Type: 'custom', Validators: [], InTable: false }),
      ]
    }),


    filesEntity,
    new EntityConfiguration(FileManagerComponent, 'FileManager', 'FileManager', { icon: 'folder' }),
    new EntityConfiguration(IconsComponent, 'Icons', 'Icons', { icon: 'format-list-checkbox' })
  ]
);
const routes: Routes = [
  ...config.entitiesConfiguration.map(c => ({ path: c.key.toLowerCase(), component: c.component, canActivate: [AuthService] }))
];


@NgModule({
  declarations: [
    CategoryComponent, ProductComponent, SizeComponent, KeywordComponent, CityComponent,
    ProvinceComponent, InvoiceComponent, ColorComponent, CustomerComponent
  ],
  imports: [
    TemplateModule, CKEditorModule,
    RouterModule.forChild(buildPath(routes, true))
  ]
})
export class BackModule {
  constructor(wss: WebSiteService) {
    wss.websites.push(config);
    wss.selectedWebsite = config;
  }
}
