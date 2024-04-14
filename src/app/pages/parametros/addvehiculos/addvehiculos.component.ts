import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EncdescService } from 'src/app/services/encdesc.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addvehiculos',
  templateUrl: './addvehiculos.component.html',
  //styleUrls: ['./addvehiculos.component.css']
})
export class AddvehiculosComponent implements OnInit {
  puesto: any;

   constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router, private routes: ActivatedRoute) {
  }
   /*  private encryp: EncdescService,
    private fb: FormBuilder,
    private serv: DataService,
    private route: Router,
    private routes: ActivatedRoute */
    vehiculo: any;
    login_data: any;
    id!: string | null;
    forma!: FormGroup;


  

  ngOnInit(): void {
    this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
    this.crearFormulario();
    this.id = this.encryp.decryptData(this.routes.snapshot.paramMap.get('id'));

    if (this.id != 'add') {

     this.vehiculo = this.encryp.decryptData(this.routes.snapshot.paramMap.get('id'));
      // console.log(this.marca);

     // this.forma.patchValue({
      //this.forma.controls['id_usuario'].setValue(this.usuario.id_usuario);
      this.forma.controls['id_vehiculo'].setValue(this.vehiculo.idvehiculo);
      this.forma.controls['marca'].setValue(this.vehiculo.marca);
      this.forma.controls['nombre'].setValue(this.vehiculo.nombre);
      this.forma.controls['descripcion'].setValue(this.vehiculo.descripcion);
      this.forma.controls['estado'].setValue(this.vehiculo.estado);
      this.forma.controls['chasis'].setValue(this.vehiculo.chasis);
      this.forma.controls['color'].setValue(this.vehiculo.color);
      this.forma.controls['combustible'].setValue(this.vehiculo.combustible);
      this.forma.controls['modelo'].setValue(this.vehiculo.modelo);
      this.forma.controls['ultimomantenimiento'].setValue(this.vehiculo.ultimomantenimiento);
      this.forma.controls['seguro'].setValue(this.vehiculo.seguro);
      this.forma.controls['idusuario'].setValue(this.vehiculo.idusuario);
      this.forma.controls['fecha'].setValue(this.vehiculo.fecha);
      this.forma.controls['segurovence'].setValue(this.vehiculo.segurovence);
    
    }
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id_vehiculo: [''],
      marca: [''],
      nombre: [''],
      descripcion: [''],
      estado: [''],
     // nombre: ['', [Validators.required]],
      chasis: [''],
      color: [''],
      combustible: [''],
      modelo: [''],
      ultimomantenimiento: [''],
      seguro: [''],
      idusuario: [''],
      fecha: [''],
      segurovence: ['']
    });
  }

  get nombreNoValido() {
    return this.forma.get('nombre')!.invalid && this.forma.get('nombre')!.touched;
  }

  get marcaNoValido() {
    return this.forma.get('marca')!.invalid && this.forma.get('marca')!.touched;
  }

  get descripcionNoValido() {
    return this.forma.get('descripcion')!.invalid && this.forma.get('descripcion')!.touched;
  }

  get estadoNoValido() {
    return this.forma.get('estado')!.invalid && this.forma.get('estado')!.touched;
  }

  get chasisNoValido() {
    return this.forma.get('chasis')!.invalid && this.forma.get('estado')!.touched;
  }

  get colorNoValido() {
    return this.forma.get('color')!.invalid && this.forma.get('estado')!.touched;
  }

  get combustibleNoValido() {
    return this.forma.get('combustible')!.invalid && this.forma.get('estado')!.touched;
  }

  get modeloNoValido() {
    return this.forma.get('modelo')!.invalid && this.forma.get('estado')!.touched;
  }

  get ultimomantenimientoNoValido() {
    return this.forma.get('ultimomantenimiento')!.invalid && this.forma.get('estado')!.touched;
  }

  get seguroNoValido() {
    return this.forma.get('seguro')!.invalid && this.forma.get('estado')!.touched;
  }

  get idusuarioNoValido() {
    return this.forma.get('idusuario')!.invalid && this.forma.get('estado')!.touched;
  }

  get fechaNoValido() {
    return this.forma.get('fecha')!.invalid && this.forma.get('estado')!.touched;
  }

  get segurovenceNoValido() {
    return this.forma.get('segurovence')!.invalid && this.forma.get('estado')!.touched;
  }

  get idvehiculoNoValido() {
    return this.forma.get('idvehiculo')!.invalid && this.forma.get('estado')!.touched;
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    Swal.fire({
      icon: 'warning',
      text: '¿Seguro que desea guardar?',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        
        if (this.id !== 'add') {
          this.actualizarVehiculo(this.forma.value);
        } else {
          this.guardarVehiculo(this.forma.value);
        }
        Swal.fire({
          icon: 'success',
          text: '¡Guardado exitosamente!',
          confirmButtonText: 'Ok',
        }).then((rep) => {
          this.route.navigate(['/dashboard/vehiculos']);
        });
      }
    });
  }

  guardarVehiculo(forma: any) {
    let datos: any = {
      ...forma,
      jwt: 1,
      usuario_registro: this.login_data.id_usuario,
    };

    this.serv.consultass(JSON.stringify(datos), '/vehiculos/agregar.php').then((resp: any) => {
      // Manejar la respuesta del servicio si es necesario
    });
  }

  actualizarVehiculo(forma: any) {
    let datos: any = {
      ...forma,
      jwt: 1,
      usuario_modificado: this.login_data.id_usuario,
    };

    this.serv.consultass(JSON.stringify(datos), '/vehiculos/editar.php').then((resp: any) => {
      // Manejar la respuesta del servicio si es necesario
    });
  }

}
