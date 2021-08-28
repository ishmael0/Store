import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WebSelectorComponent } from '../../../../Santel/Core/ClientApp/src/app/components/web-selector/web-selector.component';
import { LoginComponent } from '../../../../Santel/Core/ClientApp/src/app/components/login/login.component';
import { SharedModule } from '../../../../Santel/Core/ClientApp/src/app/shared.module';
import { WebSiteService } from '../../../../Santel/Core/ClientApp/src/app/services/website.service';



const routes: Routes = [
  { path: '', redirectTo: 'webselector', pathMatch: 'full' },
  {
    path: 'myaccstore', loadChildren: () => import('../../../../Santel/Core/ClientApp/src/app/myacc/myacc.module').then(m => m.MyAcc),
    data: {
      key: 'myAccstore', label: 'مدیریت کاربران', isAcc: true
    }
  },
  {
    path: 'storedb', loadChildren: () => import('./store.module').then(m => m.StoreModule),
    data: { key: 'StoreDB', label: ' مدیریت وب سایت' }
  },
  { path: 'webselector', component: WebSelectorComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(wss: WebSiteService) {
    wss.appConfig = {
      description: '',
      fullName: '',
      logInDesc: 'فروشگاه اینترنتی ...'
    }
  }
}
