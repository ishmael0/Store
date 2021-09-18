import { Component , OnInit} from '@angular/core';
import { toTreeHelper } from '../../../../Santel/Core/ClientApp/src/app/services/utils';
import { HttpService } from './front/http.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(public http: HttpService ) { }
  async ngOnInit()  {
    let data: any = await this.http.get('api/Front/GetInitial').toPromise();
    this.http.data.categories = data.categories;
    this.http.data.categories.forEach(c => {
      c.Icon = this.http.domSanitizer.bypassSecurityTrustHtml(c.Icon);
    });

    this.http.data.categoriesTree = toTreeHelper(data.categories, 'Id', 'ParentCategoryId', null);
    console.log(this.http.data)
   }
  title = 'ClientApp';

}
