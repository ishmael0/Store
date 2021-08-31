import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { BasketComponent } from './basket/basket.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: LayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: HomeComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'product', component: ProductComponent },
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
    BasketComponent,
    InvoiceComponent,
    ProfileComponent,
    ContactUsComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FromModule {
}
