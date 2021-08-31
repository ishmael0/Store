import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
