import { StorageService } from './../../../shared/services/storage.service';
import { SignInService } from './sign-in.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ILogin } from '../../../models/login.model';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
    usr_email: new FormControl('', [Validators.required, Validators.email]),
    usr_password: new FormControl('', [Validators.required]),
  });

  constructor(private signInService: SignInService, private storageService: StorageService, private router: Router) {}

  toggle() {
    this.onToggle = !this.onToggle;
  }

  async onSubmit() {
    if (this.authForm.valid) {
      const authenticationForm = this.authForm.value as ILogin;

      if (authenticationForm.usr_password) {
        authenticationForm.usr_password = btoa(authenticationForm.usr_password);
      }

      const response = await lastValueFrom(this.signInService.postAuth(authenticationForm));

      const { id, usr_email, usr_nameComplete, usr_cedula, usr_nroCelular, usr_direccion, access } = response.body;

      this.storageService.postStorage('person', {
        id,
        email: usr_email,
        name: usr_nameComplete,
        cedula: usr_cedula,
        celular: usr_nroCelular,
        direccion: usr_direccion,
      });

      this.storageService.postStorage('access', access, true);

      this.router.navigate(['/admin/reportes']);

      console.log(authenticationForm, response);
    }
  }
}
