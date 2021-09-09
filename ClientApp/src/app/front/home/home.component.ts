import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../http.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    dots: true,
    loop: true,
    center: true,
    autoWidth:true,
    margin:10,
    navSpeed: 700,
    navText: ['<', '>'],
    rtl: true,
    nav:true,
    responsive: {
      0: {
        items: 1
      },
    }
  }
}
