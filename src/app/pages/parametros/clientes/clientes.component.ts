import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
 // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router) {}

  filtro: any;
  clientes: any[] = [];
  login_data: any;

  ngOnInit(): void {
    this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
    this.getClientes();
  }

  agregarCliente(cliente: any) {
    this.route.navigate(['/dashboard/cliente', this.encryp.encryptData(JSON.stringify(cliente))]);
  }

  editarCliente(cliente: any) {
    this.route.navigate(['/dashboard/cliente', this.encryp.encryptData(JSON.stringify(cliente))]);
  }

  getClientes() {
    let datos = {
      codigousuario: this.login_data.usuario,
      jwt: '1'
    };

    this.serv.consultas(datos, 'clientes/listall.php')
      .subscribe((resp: any) => {
        if (resp.status) {
          this.clientes = resp.data;
          console.log(this.clientes);
        } else {
          return;
        }
      }, (err: any) => {
        console.log(err);
      });
  }

  cambiarEstadoCliente(cliente: any, estado: string) {
    let est = estado === 'I' ? 'inactivar' : 'activar';
  
    Swal.fire({
      icon: 'warning',
      text: `¿Seguro que desea ${est} a este cliente?`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        let datos = {
          id_cliente: cliente.id_cliente,
          estado: estado,
          jwt: '1'
        };
  
        try {
          this.serv.consultas(datos, '/clientes/estado.php').pipe(
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