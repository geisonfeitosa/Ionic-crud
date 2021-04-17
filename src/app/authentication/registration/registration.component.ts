import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ],
      celular: [null],
      password: [null, Validators.compose([Validators.required])],
      confirmPassword: [null, Validators.required],
    });
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async register() {
    this.markFormGroupTouched(this.form);

    if (!this.form.valid) {
      await this.alertService.presentAlert("Erro!", "", "Verifique todos os campos com erro.");
      return;
    }

    await this.loadingService.presentLoading();
    
    let users: any = localStorage.getItem("users");
    if (users) users = JSON.parse(users);
    else users = [];
    
    if (users.length > 0 && users.filter(i => i.email === this.form.get('email').value).length > 0) {
      await this.alertService.presentAlert("Erro!", "Solicitação de registro negada.", "Este e-mail já está cadastrado.");
      return;
    }
    
    users.push(this.form.value);
    localStorage.setItem("users", JSON.stringify(users));
    
    await this.alertService.presentAlert("Sucesso!", "Solicitação de registro efetuada.", "Um e-mail foi enviado, para ativar a conta você deve acessa-lo.");
    this.router.navigate(['/authentication/login']);
  }

}