import { ButtonModule } from 'primeng/button';
import { StorageService } from '../../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../common/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';

@Component({
  selector: 'app-plantilla',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, ButtonModule],
  templateUrl: './plantilla.component.html',
  styleUrl: './plantilla.component.css',
})
export class PlantillaComponent implements OnInit {
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
