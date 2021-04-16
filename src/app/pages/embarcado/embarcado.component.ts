import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { AlertService } from 'src/app/services/alert.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-embarcado',
  templateUrl: './embarcado.component.html',
  styleUrls: ['./embarcado.component.scss'],
})
export class EmbarcadoComponent implements OnInit {

  public form: FormGroup;
  comunicacoes: string[] = ["Estação cliente", "Roteador"];
  topicosMqttList: string[] = ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4", "Tópico 5"];
  embarcados: any[] = [];
  isNew = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
  ) { }


  ngOnInit() {
    this.initEmbarcados();
    this.form = this.fb.group({
      descricao: [null],
      firmware: [null],
      status: [null],
      comunicacao: [null],
      ipEmbarcado: [null],
      macEmbarcado: [null],
      ipGateway: [null],
      ipMqtt: [null],
      portaMqtt: [null],
      topicosMqtt: [null]
    });
  }

  async initEmbarcados() {
    const embStorage = await Storage.get({ key: "embarcados" });
    this.embarcados = JSON.parse(embStorage.value) || [];
  }

  save() {
    this.embarcados.push(this.form.value);
    this.form.reset();
    this.isNew = false;
    this.updateStorage();
  }

  detail(item) {
    this.alertService.presentAlert(
      "Ambiente",
      "",
      `<strong>Descrição: </strong>${item.descricao ? item.descricao : 'N/A'}</br>
      <strong>Firmware: </strong>${item.firmware ? item.firmware : 'N/A'}</br>
      <strong>Status: </strong>${item.status ? item.status : 'N/A'}</br>
      <strong>Comunicação: </strong>${item.comunicacao ? item.comunicacao : 'N/A'}</br>
      <strong>Ip do Embarcado: </strong>${item.ipEmbarcado ? item.ipEmbarcado : 'N/A'}</br>
      <strong>Mac. do Embarcado: </strong>${item.macEmbarcado ? item.macEmbarcado : 'N/A'}</br>
      <strong>IP do Gateway: </strong>${item.ipGateway ? item.ipGateway : 'N/A'}</br>
      <strong>IP do Mqtt: </strong>${item.ipMqtt ? item.ipMqtt : 'N/A'}</br>
      <strong>Porta do Mqtt: </strong>${item.portaMqtt ? item.portaMqtt : 'N/A'}</br>
      <strong>Tópicos do Gateway: </strong>${item.topicosMqtt ? item.topicosMqtt : 'N/A'}</br>`
    );
  }

  delete(index) {
    this.embarcados.splice(index, 1);
    this.updateStorage();
  }

  updateStorage() {
    Storage.set({
      key: "embarcados",
      value: JSON.stringify(this.embarcados)
    });
  }

}
