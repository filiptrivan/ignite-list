import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './dashboard.component.html',
    standalone: false,
    styleUrl:'./dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

   cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  selectedCity: any = null;

  constructor(

  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

}

