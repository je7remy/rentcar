import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { Router, ActivatedRoute } from '@angular/router';
    import { DataService } from 'src/app/services/data.service';
    import { EncdescService } from 'src/app/services/encdesc.service';
    import Swal from 'sweetalert2';
    declare var $: any;
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';

@Component({
  selector: 'app-repclientes',
  templateUrl: './repclientes.component.html',
  //styleUrls: ['./repclientes.component.css']
})
export class RepclientesComponent {
cliente: any;

 muestra = false;

 reporte: any;
 cant =0 ;

 nombre_cliente="";
constructor(private encryp: EncdescService, private fb: FormBuilder, private serv: DataService, private route: Router, private routes: ActivatedRoute) {
}
citas: any;
login_data: any;
id!: string | null;
forma!: FormGroup;

fecha: any;

ngOnInit(): void {

this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));
this.crearFormulario();

 this.login_data = this.encryp.decryptData(localStorage.getItem('meta'));


 this.nombre_cliente= this.login_data.nombre;


 this.fecha = new Date().toLocaleDateString();
 this.getclientes();
}


crearFormulario() {
this.forma = this.fb.group({

desde:[''],
hasta:[''],
estado:[''],
id_cliente:[''],

});



}

//armar por campos id_

getclientes() {
 this. cliente =[];
 let datos =
 {
   codigousuario: this.login_data.id_usuario,
   jwt: '1'
 }
 this.serv.consultas(datos, 'reporte/listallcliente.php')
   .subscribe((resp: any) => {
     if (resp.status) {
       this. cliente = resp.data;
     
     }
     else {
       return
     }

   }, (err: any) => {
     console.log(err);
   });
} 



getreporte() {
let datos =
{
  id_cliente: this.forma.value.id_cliente,
  estado: this.forma.value.estado,
  jwt: '1'
}

console.log(datos);
this.serv.consultas(datos, 'reporte/lisrepcliente.php')
  .subscribe((resp: any) => {
   console.log(resp);
    if (resp.status) {
     this. reporte = resp.data;
      console.log(resp);

      this.cant = resp.data.length;
    }
    else {
      return
    }

  }, (err: any) => {
    console.log(err);
  });
} 

generar(){
this.muestra = true;

}


generarpdf(){


Swal.fire({
 allowOutsideClick: false,
 icon: 'info',
 text: 'Espere por favor...'
});
Swal.showLoading();

 const DATA = document.getElementById('htmlData');
 const doc = new jsPDF('p', 'pt', 'a4' );
 const options = {
   background: 'white',
   scale: 3
 };
 if (DATA) {
  html2canvas(DATA, options).then((canvas) => {


   const img = canvas.toDataURL('image/PNG');

   // Add image Canvas to PDF
   const bufferX = 15;
   const bufferY = 15;
   const imgProps = (doc as any).getImageProperties(img);
   const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
   return doc;
 }).then((docResult) => {
  Swal.close();

   docResult.save(`${new Date().toISOString()}_repcliente.pdf`);
 });
}
}}
