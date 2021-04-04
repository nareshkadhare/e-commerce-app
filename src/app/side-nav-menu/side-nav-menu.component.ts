import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css'],
})
export class SideNavMenuComponent implements OnInit {

  @Input() openSideNav;

  @Output() menuEvent = new EventEmitter();

  menuItems = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      icon: 'dashboard',
    },
    {
      name: 'Categories',
      path: 'categories',
      icon: 'account_tree',
    },
    {
      name: 'Products',
      path: 'products',
      icon: 'devices',
    },
    {
      name: 'Orders',
      path: 'orders',
      icon: 'list',
    },
    {
      name: 'Sign Out',
      path: 'orders',
      icon: 'logout',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.menuEvent.emit(false);
  }

}
