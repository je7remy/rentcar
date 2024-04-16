import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router, private routes: ActivatedRoute) {

 }
 filtro: any;
 id_empr: any;
 habitos: any;
 login_data: any;
 forma!: FormGroup;

 monto1: any;
 monto2: any;
 monto3: any;
 monto4: any;

 tblcitas: any;
 tblconsultas: any;

 ngOnInit(): void {
   this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
   this.gethabitos();

 }

 gethabitos() {
   let datos =
   {
     codigousuario: this.login_data.usuario,
     jwt: '1'
   }
   this.serv.consultas(datos, 'dashboard/listall.php')
     .subscribe((resp: any) => {
      console.log(resp);
       if (resp.status) {
       
          this.monto1= resp.cantidadusuario1;
          this.monto2= resp.cantidadusuario2;
          this.monto3= resp.cantidadusuario3;
          this.monto4= resp.cantidadusuario4;
          this.tblcitas= resp.tblusuario1;
          this.tblconsultas= resp.tblusuario2;
       }
       else {
         return
       }

     }, (err: any) => {
       console.log(err);
     });
 }


}
