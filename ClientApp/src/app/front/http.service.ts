import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { icons } from '../../../../../Santel/Core/ClientApp/src/app/services/icon';
import { SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient{

  constructor(handler: HttpHandler, public ns: NzNotificationService) {
    super(handler);
    this.icons = icons;
  }
  icons: Dictionary<SafeHtml>;
}
