import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment";
import './rxjs-operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tour of heroes';

  ngOnInit(): void {
  }
}
