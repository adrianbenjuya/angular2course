import { Component, OnInit } from '@angular/core';
import { environment } from "environments/environment";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Tour of heroes';

  ngOnInit(): void {
  }
}
