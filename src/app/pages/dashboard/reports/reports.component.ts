import { ButtonModule } from 'primeng/button';
import { StorageService } from './../../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../common/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, ButtonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  data: any;
  onSwitch: boolean = true;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.data = this.storageService.getStorage('access');
    console.log(this.data);
  }

  toggle() {
    this.onSwitch = !this.onSwitch;
  }
}
