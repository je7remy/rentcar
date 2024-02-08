import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})
export class AddusuarioComponent implements OnInit {

  puesto: any;

  constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router, private routes: ActivatedRoute) {
  }
  usuario: any;
  login_data: any;
  id!: string | null;
  forma!: FormGroup;

  ngOnInit(): void {
    this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
    this.crearFormulario();
    this.id = this.encryp.decryptData(this.routes.snapshot.paramMap.get('id'));


    this.getpuesto();


    if (this.id != 'add') {

      this.usuario = this.encryp.decryptData(this.routes.snapshot.paramMap.get('id'));
      // console.log(this.marca);

      //armar aqui campos

      this.forma.controls['id_usuario'].setValue(this.usuario.id_usuario);
      this.forma.controls['nombre'].setValue(this.usuario.nombre);
      this.forma.controls['id_puesto'].setValue(this.usuario.id_puesto);
      this.forma.controls['usuario'].setValue(this.usuario.usuario);
      this.forma.controls['clave'].setValue(this.usuario.clave);
      this.forma.controls['titulo'].setValue(this.usuario.titulo);
      this.forma.controls['tipo_usuario'].setValue(this.usuario.tipo_usuario);
      this.forma.controls['estado'].setValue(this.usuario.estado);
    }
  }
  crearFormulario() {
    this.forma = this.fb.group({

      id_usuario: [''],
      nombre: ['', [Validators.required]],
      id_puesto: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      tipo_usuario: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });



  }
  //armar campos db

  get nombreNoValido() {
    return this.forma.get('nombre')!.invalid && this.forma.get('nombre')!.touched
  }
  get id_puestoNoValido() {
    return this.forma.get('id_puesto')!.invalid && this.forma.get('id_puesto')!.touched
  }
  get usuarioNoValido() {
    return this.forma.get('usuario')!.invalid && this.forma.get('usuario')!.touched
  }
  get claveNoValido() {
    return this.forma.get('clave')!.invalid && this.forma.get('clave')!.touched
  }
  get tituloNoValido() {
    return this.forma.get('titulo')!.invalid && this.forma.get('titulo')!.touched
  }
  get tipo_usuarioNoValido() {
    return this.forma.get('tipo_usuario')!.invalid && this.forma.get('tipo_usuario')!.touched
  }
  get estadoNoValido() {
    return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched
  }


  Cerrarmodal(forma: FormGroup) {

    forma.reset();
  }

  //armar por campos id_

  getpuesto() {
    let datos =
    {
      codigousuario: this.login_data.id_usuario,
      jwt: '1'
    }
    this.serv.consultas(datos, 'puesto/listall.php')
      .subscribe((resp: any) => {
        if (resp.status) {
          this.puesto = resp.data;
          console.log(this.puesto);
        }
        else {
          return
        }

      }, (err: any) => {
        console.log(err);
      });
  }




  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched())
        }
        else {
          control.markAsTouched();
        }
      })

    }

    Swal.fire({
      icon: 'warning',
      text: 'Seguro que desea guardar?',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.id != 'add') {
          this.Actualizausuario(this.forma.value);

        }
        if (this.id === 'add') {
          this.Guardausuario(this.forma.value);

        }
        Swal.fire({
          icon: 'success',
          text: 'Done!',
          confirmButtonText: 'Ok',
        }).then(rep => {
          this.route.navigate(['/dashboard/usuario']);
        })
      } else if (result.isDismissed) {
        null
      }
    })
  }

  Guardausuario(forma: any) {
    let datos: any = {};
    let dato: any = {};

    dato['nombre'] = forma.nombre;
    dato['id_puesto'] = forma.id_puesto;
    dato['usuario'] = forma.usuario;
    dato['clave'] = forma.clave;
    dato['titulo'] = forma.titulo;
    dato['tipo_usuario'] = forma.tipo_usuario;
    dato['estado'] = forma.estado;

    dato['jwt'] = 1;
    dato['usuario_registro'] = this.login_data.id_usuario;



    datos = JSON.stringify(dato);

    try {
      this.serv.consultass(datos, '/usuario/agregar.php').then((resp: any) => {
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  Actualizausuario(forma: any) {
    let datos: any = {};
    let dato: any = {};


    dato['id_usuario'] = forma.id_usuario;
    dato['nombre'] = forma.nombre;
    dato['id_puesto'] = forma.id_puesto;
    dato['usuario'] = forma.usuario;
    dato['clave'] = forma.clave;
    dato['titulo'] = forma.titulo;
    dato['tipo_usuario'] = forma.tipo_usuario;
    dato['estado'] = forma.estado;

    dato['jwt'] = 1;
    dato['usuario_modificado'] = this.login_data.id_usuario;


    datos = JSON.stringify(dato);
    try {
      this.serv.consultass(datos, '/usuario/editar.php').then((resp: any) => {
      })
    }
    catch (e) {
      console.log(e);
    }
  }

}
