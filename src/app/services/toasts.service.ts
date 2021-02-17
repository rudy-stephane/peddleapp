import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// tslint:disable
export class ToastsService {

  constructor() { }
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
