import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'loading',
  template: '<div id="loading"><img src="../images/loading.png" class="{{theme}}" /></div>',
  styleUrls: ['loading.component.css']
})
export class LoadingComponent {

    @Input() theme: string
}
