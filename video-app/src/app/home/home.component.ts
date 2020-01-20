import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 3, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 3, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 3, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 3, color: '#DDBDF1'},
    {text: 'Five', cols: 1, rows: 3, color: 'lightblue'},
    {text: 'Six', cols: 1, rows: 3, color: 'lightgreen'},
    {text: 'Seven', cols: 1, rows: 3, color: 'lightpink'},
    {text: 'Eight', cols: 1, rows: 3, color: '#DDBDF1'},
  ];

  // MatPaginator Output
  pageEvent: PageEvent;
  constructor() { }

  ngOnInit() {
  }

}
