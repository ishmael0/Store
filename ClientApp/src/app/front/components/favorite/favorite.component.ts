import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

}
