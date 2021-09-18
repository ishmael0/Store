import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { icons } from '../../../../../Santel/Core/ClientApp/src/app/services/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export interface IDataInterFace{
  categories: any[] ;
  categoriesTree: any[] ;
}
@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient{

  constructor(handler: HttpHandler, public ns: NzNotificationService, public domSanitizer: DomSanitizer) {
    super(handler);
  }
  icons = icons;
  data: Partial<IDataInterFace> = {};
}
