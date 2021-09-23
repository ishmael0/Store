import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTreeComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

}
