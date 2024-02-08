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


@NgModule({
  declarations: [
    DashboardComponent,
    FilterPipe,
    NotImagePipe,
    UsuarioComponent,
    AddusuarioComponent,
   
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
