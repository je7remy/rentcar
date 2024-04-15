import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { EncdescService } from 'src/app/services/encdesc.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  menu_adm_proceso: any[] = [];
  menu_adm_param: any[] = [];
  menu_adm_reporte: any[] = [];
  


 login_data:any;
 tipo_usuario:any;
 nombre_usuario:any;

  constructor( private route: Router,private encryp: EncdescService,public routes: ActivatedRoute, private router: Router) {
   this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));

     this.tipo_usuario = this.login_data.tipo_usuario;
     this.nombre_usuario = this.login_data.nombre;
  }


  ngOnInit(): void {
     this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));

     this.tipo_usuario = this.login_data.tipo_usuario;
     this.nombre_usuario = this.login_data.nombre;

if (this.tipo_usuario =="USR"){
     this.menu_adm_param = [
{ name: "Registro de usuario", url: "/dashboard/usuario", icono: "nav-icon fas fa-book" }, 
  ];
  
    this.menu_adm_proceso = [
      { name: "Ingresos/Egresos", url: "/dashboard/ingresosegresos", icono: "nav-icon fas fa-book" },

    ];
  
  
    this.menu_adm_reporte = [
      { name: "Egresos/Ingresos", url: "/dashboard/repcitas", icono: "nav-icon fas fa-file" },
    ];
  

   }else{

    
    this.menu_adm_param = [
   { name: "Registro de Empresa", url: "/dashboard/empresa", icono: "nav-icon fas fa-th" },
   { name: "Registro de Sucursal", url: "/dashboard/sucursal", icono: "nav-icon fas fa-th" },
   { name: "Registro de Vehiculos", url: "/dashboard/vehiculos", icono: "nav-icon fas fa-th" },
   { name: "Registro de Clientes", url: "/dashboard/clientes", icono: "nav-icon fas fa-th" },
   { name: "Registro de Usuario", url: "/dashboard/usuario", icono: "nav-icon fas fa-th" },
 ];

 this.menu_adm_proceso = [
  { name: "Gastos", url: "/dashboard/gastos", icono: "nav-icon fas fa-book" },
  { name: "Reservacion", url: "/dashboard/reservacion", icono: "nav-icon fas fa-book" },
  { name: "Factura", url: "/dashboard/factura", icono: "nav-icon fas fa-book" },
  { name: "Reparaciones", url: "/dashboard/reparaciones", icono: "nav-icon fas fa-book" },
 ];


 this.menu_adm_reporte = [
   { name: "Ingresos/Egresos", url: "/dashboard/ingresosegresos", icono: "nav-icon fas fa-file" },
   { name: "Facturas", url: "/dashboard/facturas", icono: "nav-icon fas fa-file" },
   { name: "Clientes", url: "/dashboard/repclientes", icono: "nav-icon fas fa-file" },
   { name: "Vehiculos Pendientes", url: "/dashboard/vehiculospendientes", icono: "nav-icon fas fa-file" },

 ];
   }

  }

salir(){
 localStorage.removeItem("meta");
 this.route.navigate(['/login']);
}

  isActive(route: string) {
    if (route === this.router.url) {
      return true;
    }
    return false;
  }
}
