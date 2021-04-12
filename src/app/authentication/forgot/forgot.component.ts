import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ]
    });
  }

  async recover() {
    this.markFormGroupTouched(this.form);

    if (!this.form.valid) return;

    await this.loadingService.presentLoading();
    await this.alertService.presentAlert("Sucesso!", "Solicitação enviada.", "Em breve você receberá um e-mail com a recuperação da sua senha.");
    this.router.navigate(['/authentication/login']);
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

}