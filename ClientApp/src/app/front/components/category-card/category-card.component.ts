import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent implements OnInit {

  constructor(public http: HttpService) { }
  @Input() data: any = {};
  ngOnInit(): void {
    console.log(this.data)
  }

}
