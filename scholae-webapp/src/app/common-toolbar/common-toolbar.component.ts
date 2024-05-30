import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-toolbar',
  templateUrl: './common-toolbar.component.html',
  styleUrls: ['./common-toolbar.component.css']
})
export class CommonToolbarComponent implements OnInit {

  @Input() public title: string;

  constructor() { }


  ngOnInit() {
  }

}
