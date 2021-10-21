import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService, ICategory } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
    `.picked{background-color: #00b74a;border-color: #00a744;}`+
    `.npicked{border-color: #00a744;color:black;background-color: white;margin:5px;}`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  parametersObservable: any;
  product: any = undefined;
  category: any = undefined;
  bread = [];
  constructor(public http: HttpService, public route: ActivatedRoute, public cdr: ChangeDetectorRef, private router: Router) {
    this.parametersObservable = this.route.params.subscribe(async params => {
      let id = +this.http.getParam(this.route, 'productId');
      this.product = await http.getProduct(id);
      if (await this.router.navigate([http.buildProductUrl(this.product)]) !== false) {
        this.category = http.getCategory(this.product.CategoryId);
        let e = this.category.Id;
         while (e) {
          let x = http.getCategory(e);
          e = x.ParentCategoryId;
          this.bread.push(x.Title);
        }

        if (!this.product.Types.some(c => c.selected === true)) {
          this.product.Types[0].selected = true;
          this.selectedType = this.product.Types[0];
        }
        this.cdr.detectChanges();
        console.log(this.category, this.product)
      }
    });
  }
  selecttype(item) {
    if (item.selected) return;
    else { this.product.Types.filter(c => c.selected).forEach(c => c.selected = false); }
    item.selected = true;
    this.selectedType= item;
  }
  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
  selectedType:any  = {};
  customOptions: OwlOptions = {
    dots: true,
    loop: true,
    center: true,
    autoWidth: true,
    margin: 10,
    navSpeed: 700,
    navText: ['>', '<'],
    rtl: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
    }
  }
  ngOnInit(): void {


  }
  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: 'adsas'
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: 'asdas'
    }
  ];
}
