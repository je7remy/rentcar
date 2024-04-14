import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddusuarioComponent } from './pages/parametros/addusuario/addusuario.component';
import { UsuarioComponent } from './pages/parametros/usuario/usuario.component';
import { VehiculosComponent } from './pages/parametros/vehiculos/vehiculos.component';
import { AddvehiculosComponent } from './pages/parametros/addvehiculos/addvehiculos.component';
import { ClientesComponent } from './pages/parametros/clientes/clientes.component';
import { AddclientesComponent } from './pages/parametros/addclientes/addclientes.component';




const routes: Routes = [
  {
    path: 'dashboard', component: NavbarComponent,
    children: [
      { path: 'dash', component: DashboardComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'addclientes/:id', component: AddclientesComponent },
      { path: 'vehiculos', component: VehiculosComponent },
      { path: 'addvehiculos/:id', component: AddvehiculosComponent },
      { path: 'usuario/:id', component: AddusuarioComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
