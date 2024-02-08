import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { EncdescService } from 'src/app/services/encdesc.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  menu_adm_param = [];

  menu_adm_proceso = [];


  menu_adm_reporte = [];


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

if (this.tipo_usuario =="ADM"){
     this.menu_adm_param = [
//{ name: "Registro de usuario", url: "/dashboard/usuario", icono: "nav-icon fas fa-book" }, 
  ];
  
    this.menu_adm_proceso = [
    //  { name: "Ingresos/Egresos", url: "/dashboard/ingresos_egresos", icono: "nav-icon fas fa-book" },

    ];
  
  
    this.menu_adm_reporte = [
     // { name: "Egresos/Ingresos", url: "/dashboard/repcitas", icono: "nav-icon fas fa-file" },
    ];
  

   }else{

    
    this.menu_adm_param = [

   //{ name: "Registro de cie10", url: "/dashboard/cie10", icono: "nav-icon fas fa-book" },

 ];

 this.menu_adm_proceso = [
 //  { name: "Citas", url: "/dashboard/citas", icono: "nav-icon fas fa-th" },
 ];


 this.menu_adm_reporte = [
 //  { name: "Reporte de Citas", url: "/dashboard/repcitas", icono: "nav-icon fas fa-file" },

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
