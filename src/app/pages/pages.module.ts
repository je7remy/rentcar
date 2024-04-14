import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotImagePipe } from './pipes/not-image.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { TooltipModule } from '../common/ui/tooltip/tooltip.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './parametros/usuario/usuario.component';

import { AddusuarioComponent } from './parametros/addusuario/addusuario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VehiculosComponent } from './parametros/vehiculos/vehiculos.component';
import { AddvehiculosComponent } from './parametros/addvehiculos/addvehiculos.component';
import { ClientesComponent } from './parametros/clientes/clientes.component';
import { AddclientesComponent } from './parametros/addclientes/addclientes.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FilterPipe,
    NotImagePipe,
    UsuarioComponent,
    AddusuarioComponent,
    VehiculosComponent,
    AddvehiculosComponent,
    ClientesComponent,
    AddclientesComponent,
   
  ],
  imports: [
    CommonModule,
    TooltipModule,
    NgSelectModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule

  ]
})
export class PagesModule { }
