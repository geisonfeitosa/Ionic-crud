import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ],
      password: [null, Validators.compose([Validators.required])]
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

  async login() {
    this.markFormGroupTouched(this.form);

    if (!this.form.valid) {
      await this.alertService.presentAlert("Erro!", "", "Verifique todos os campos com erro.");
      return;
    }

    await this.loadingService.presentLoading();
    
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      users = users.filter(i => i.email === this.form.get('email').value);
      if (users.length > 0) {
        let user = users[0];
        if (user.password === this.form.get('password').value) {
          localStorage.setItem("user", JSON.stringify({name: user.name, email: user.email}));
          localStorage.setItem("access_token", "123456");
          this.router.navigate(['/pages/sala']);
          return;
        }
      }
    }
    this.alertService.presentAlert("Erro!", "Solicitação de login negada!", "E-mail ou Senha incorretos.");
  }

}
