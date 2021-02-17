import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastsService} from '../services/toasts.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.css'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {'[class.ngb-toasts]': 'true'}
})
// tslint:disable
export class ToastsContainerComponent implements OnInit {

  constructor(public toastService: ToastsService) { }

  ngOnInit(): void {
  }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
