import { Component } from '@angular/core';

@Component({
  selector: 'loading',
  template: '<div id="loading"><i class="fa fa-spinner fa-spin"></i></div>',
  styles: ['#loading { font-size: 26px }']
})
export class LoadingComponent {
}
