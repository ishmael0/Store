import { Component , OnInit} from '@angular/core';
import { toTreeHelper } from '../../../../Santel/Core/ClientApp/src/app/services/utils';
import { HttpService } from './front/http.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  constructor(public http: HttpService ) { }

  title = 'ClientApp';

}
