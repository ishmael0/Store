import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../http.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { toTreeHelper } from '../../../../../../Santel/Core/ClientApp/src/app/services/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpService) { }

  async ngOnInit(): Promise<void> {
    let data :any= await this.http.get('​api​/Front​/GetInitial').toPromise(); 
    console.log(data);
    let x = toTreeHelper(data.categories, 'Id', 'ParentId', null);
    console.log(x);

  }
  customOptions: OwlOptions = {
    dots: true,
    loop: true,
    center: true,
    autoWidth:true,
    margin:10,
    navSpeed: 700,
    navText: ['>', '<'],
    rtl: true,
    nav:true,
    responsive: {
      0: {
        items: 1
      },
    }
  }

  customOptions3: OwlOptions = {
    dots: false,
    loop: true,
    center: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    navText: ['بعدی', 'قبلی'],
    rtl: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 3
      },
      1000: {
        items: 4
      },
      2000: {
        items: 5
      },
    }
  }

}
