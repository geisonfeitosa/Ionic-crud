import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { AlertService } from 'src/app/services/alert.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss'],
})
export class SalaComponent implements OnInit {

  public form: FormGroup;
  tipos: string[] = ["Comportamental", "Laboratório", "Auditório", "Anfteatro", "Administrativo"];
  ambientes: any[] = [];
  isNew = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
  ) { }


  ngOnInit() {
    this.initAmbientes();
    this.form = this.fb.group({
      nome: [null],
      unidade: [null],
      bloco: [null],
      tipo: [null],
      capacidade: [null],
      qtComputador: [null],
      ipCamera: [null]
    });
  }

  async initAmbientes() {
    const photoList = await Storage.get({ key: "ambientes" });
    this.ambientes = JSON.parse(photoList.value) || [];
  }

  save() {
    this.ambientes.push(this.form.value);
    this.form.reset();
    this.isNew = false;
    this.updateStorage();
  }

  detail(item) {
    this.alertService.presentAlert(
      "Ambiente",
      "",
      `<strong>Nome: </strong>${item.nome ? item.nome : 'N/A'}</br>
      <strong>Unidade: </strong>${item.unidade ? item.unidade : 'N/A'}</br>
      <strong>Bloco: </strong>${item.bloco ? item.bloco : 'N/A'}</br>
      <strong>Tipo: </strong>${item.tipo ? item.tipo : 'N/A'}</br>
      <strong>Capacidade: </strong>${item.capacidade ? item.capacidade : 'N/A'}</br>
      <strong>Qtd. Computadores: </strong>${item.qtComputador ? item.qtComputador : 'N/A'}</br>
      <strong>IP da Câmera: </strong>${item.ipCamera ? item.ipCamera : 'N/A'}</br>`
    );
  }

  delete(index) {
    this.ambientes.splice(index, 1);
    this.updateStorage();
  }

  updateStorage() {
    Storage.set({
      key: "ambientes",
      value: JSON.stringify(this.ambientes)
    });
  }

}
