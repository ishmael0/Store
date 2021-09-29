import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { ProductMiniCardComponent } from './components/product-mini-card/product-mini-card.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { ProductComponent } from './product/product.component';
import { ProductCard1Component, ProductCard2Component, ProductCard3Component } from './components/product-card/product-card.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { BasketComponent } from './components/basket/basket.component';

//
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';




const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'category/:categoryId', component: CategoryComponent },
      { path: 'category/:categoryId/:categoryName', component: CategoryComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'product/:productId/:productName', component: ProductComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
];


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    InvoiceComponent,
    ProfileComponent,
    ContactUsComponent,
    ProductCard1Component,
    ProductCard2Component,
    ProductCard3Component,
    CategoryCardComponent,
    BasketComponent,
    ProductMiniCardComponent,
    CategoryTreeComponent,
    FavoriteComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzNoAnimationModule,
    NzButtonModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule.forChild([]),
    NzMenuModule,
    NzImageModule,
    NzTabsModule,
    NzTreeModule,
    NzPopoverModule,
    NzHighlightModule,
    NzInputModule,
    NzToolTipModule,
    NzDropDownModule,
    NzCardModule,
    NzNotificationModule,
    NzTreeSelectModule,
    NzInputNumberModule,
    NzModalModule,
    NzAlertModule,
    NzRadioModule,
    NzTableModule,
    NzSelectModule,
    NzSwitchModule,
    NzCascaderModule,
    NzListModule,
    NzCheckboxModule,
    NzSpinModule,
    NzProgressModule,
    NzTagModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzFormModule,
    CarouselModule,
    NzSliderModule,
    DragDropModule,
    ScrollingModule
  ]
})
export class FromModule {
}
