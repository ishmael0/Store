import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent implements OnInit {

  constructor() { }
  @Input() data: any = {};
  ngOnInit(): void {
  }

}
