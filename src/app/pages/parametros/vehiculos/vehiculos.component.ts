import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
 // styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router) {}

  filtro: any;
  vehiculos: any[] = [];
  login_data: any;

  ngOnInit(): void {
    this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
    this.getvehiculos();
  }

  agregarvehiculos(vehiculos: any) {
    this.route.navigate(['/dashboard/vehiculos', this.encryp.encryptData(JSON.stringify(vehiculos))]);
  }

  editarvehiculos(vehiculos: any) {
    this.route.navigate(['/dashboard/vehiculos', this.encryp.encryptData(JSON.stringify(vehiculos))]);
  }

  getvehiculos() {
    let datos = {
      codigousuario: this.login_data.usuario,
      jwt: '1'
    };

    this.serv.consultas(datos, 'vehiculos/listall.php')
      .subscribe((resp: any) => {
        if (resp.status) {
          this.vehiculos = resp.data;
          console.log(this.vehiculos);
        } else {
          return;
        }
      }, (err: any) => {
        console.log(err);
      });
  }

  cambiarEstadovehiculos(vehiculo: any, estado: string) {
    let est = estado === 'I' ? 'inactivar' : 'activar';
  
    Swal.fire({
      icon: 'warning',
      text: `¿Seguro que desea ${est} a este cliente?`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        let datos = {
         id_vehiculo: vehiculo.id_vehiculo,
          estado: estado,
          jwt: '1'
        };
  
        try {
          this.serv.consultas(datos, '/vehiculos/estado.php').pipe(
            switchMap((resp: any) => {
              return Swal.fire({
                icon: 'success',
                text: '¡Hecho!',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.ngOnInit();
              });
            })
          ).subscribe();
        } catch (e) {
          console.log(e);
        }
      }
    });
  }}