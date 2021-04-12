import { SalaComponent } from './sala/sala.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { EmbarcadoComponent } from './embarcado/embarcado.component';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: 'perfil',
        component: PerfilComponent,
        data: {
          title: 'Perfil'
        }
      },
      {
        path: 'sala',
        component: SalaComponent,
        data: {
          title: 'Salas'
        }
      },
      {
        path: 'embarcado',
        component: EmbarcadoComponent,
        data: {
          title: 'Embarcados'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
