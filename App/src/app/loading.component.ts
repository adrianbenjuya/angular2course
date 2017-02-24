import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  template: '<div id="loading"><img src="assets/images/loading.png" class="{{theme}}" /></div>',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

    @Input() theme: string
}
