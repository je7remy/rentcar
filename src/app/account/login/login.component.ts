import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma!: FormGroup;
  tipo_art!: string;
  loginlogo: string = environment.logo_login;
  constructor(private rutaActiva: ActivatedRoute, private serv: DataService, 
   private encrp: EncdescService, private route: Router, private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {


  }

  crearFormulario() {

    this.forma = this.fb.group({
      codusuario: ['', [Validators.required]],
      codclave: ['', [Validators.required]]
    });

  }



  get usuarioNoValido() {
    return this.forma.get('codusuario')!.invalid && this.forma.get('codusuario')!.touched
  }
  get claveNoValido() {
    return this.forma.get('codclave')!.invalid && this.forma.get('codclave')!.touched
  }




  // logear usuario
  login() {
    //this.route.navigate(['/dashboard/dash']);

    if (this.forma.valid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      const foarr = this.forma.value;



      let datos = {
        codusuario: foarr.codusuario,
        codclave: foarr.codclave
      }


      this.serv.clogin(datos)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status) {
            Swal.close();
            let dat = this.encrp.encryptData(JSON.stringify(res))
            localStorage.setItem('meta', dat!)
            this.route.navigate(['/dashboard/dash']);

          }
          else {

            Swal.fire('1', res.msg, 'error');
          }


        }, (err: any) => {
          // Swal.close();
          localStorage.clear()
          Swal.fire('2', err.msg, 'error')
        });

    }
  }
}
