import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  template: '<div id="loading" class="{{theme}}"><i class="glyphicon glyphicon-refresh"></i></div>',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    @Input() theme: string
}
