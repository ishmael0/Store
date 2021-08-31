import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
