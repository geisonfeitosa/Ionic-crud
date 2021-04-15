import { SalaComponent } from './sala/sala.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EmbarcadoComponent } from './embarcado/embarcado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PagesPageRoutingModule
  ],
  declarations: [
    PagesPage,
    EmbarcadoComponent,
    PerfilComponent,
    SalaComponent
  ]
})
export class PagesPageModule {}
