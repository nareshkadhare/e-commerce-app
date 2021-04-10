import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  openSideNav = false;
  showProgressBar = false;

  constructor(private _commonService:CommonService) {

    _commonService.apiCalledEvent.subscribe(data=>{
      this.showProgressBar = data;
    })
   }

  ngOnInit(): void {
  }

}
