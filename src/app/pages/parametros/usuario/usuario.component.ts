import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router, private routes: ActivatedRoute) {

  }
  filtro: any;
  id_empr: any;
  usuario: any;
  login_data: any;
  forma!: FormGroup;
  ngOnInit(): void {
    this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
    this.getusuario();

  }
  addusuario(usuario: any) {
    this.route.navigate(['/dashboard/usuario', this.encryp.encryptData(JSON.stringify(usuario))])
  }
  editusuario(usuario: any) {
    this.route.navigate(['/dashboard/usuario', this.encryp.encryptData(JSON.stringify(usuario))])
  }
  getusuario() {
    let datos =
    {
      codigousuario: this.login_data.usuario,
      jwt: '1'
    }
    this.serv.consultas(datos, 'usuario/listall.php')
      .subscribe((resp: any) => {
        if (resp.status) {
          this.usuario = resp.data;
          console.log(this.usuario);
        }
        else {
          return
        }

      }, (err: any) => {
        console.log(err);
      });
  }


  Estadousuario(forma: any, estado: any) {
    let est = '';

    if (estado === 'I') { est = 'inactivar' }
    if (estado === 'A') { est = 'activar' }

    Swal.fire({
      icon: 'warning',
      text: `Seguro que desea ${est} esta usuario?`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {

        let datos: any = {};
        let dato: any = {};
        dato['id_usuario'] = forma.id_usuario;
        dato['estado'] = estado;
        dato['jwt'] = '1';
        datos = JSON.stringify(dato);

        try {
          this.serv.consultass(datos, '/usuario/estado.php').then((resp: any) => {
            Swal.fire({
              icon: 'success',
              text: 'Done!',
              confirmButtonText: 'Ok',
            }).then(rep => {
              this.ngOnInit();
            })
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      else if (result.isDismissed) {
        null
      }
    })
  }
}
