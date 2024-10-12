import { StorageService } from './../../../shared/services/storage.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { Router } from '@angular/router';
import { ILogin } from '../../../models/login.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  onToggle: boolean = false;

  authForm = new FormGroup({
    usr_email: new FormControl('', [Validators.required]),
    usr_password: new FormControl('', [Validators.required]),
  });

  constructor(private storageService: StorageService, private router: Router) {}

  toggle() {
    this.onToggle = !this.onToggle;
  }

  async onSubmit() {
    if (this.authForm.valid) {
      const authenticationForm = this.authForm.value as ILogin;

      if (authenticationForm.usr_email === 'admin' && authenticationForm.usr_password === 'admin') {
        this.storageService.postStorage('person', {
          id: 1,
          email: 'admin@admin.com',
          name: 'Administrator',
          cedula: '123456789',
          celular: '0000000000',
          direccion: 'Admin Street',
        });

        this.storageService.postStorage('token', 'fake-jwt-token', true);

        this.router.navigate(['/admin/reportes']);

        console.log('Inicio de sesión exitoso');
      } else {
        console.error('Credenciales incorrectas');
      }
    }
  }
}
