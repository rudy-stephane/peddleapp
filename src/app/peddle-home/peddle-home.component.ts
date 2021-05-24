import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peddle-home',
  templateUrl: './peddle-home.component.html',
  styleUrls: ['./peddle-home.component.css']
})

// tslint:disable
export class PeddleHomeComponent implements OnInit {

  public socialNetworkCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
