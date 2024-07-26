import { Component, OnInit } from '@angular/core';
import { InfoClienteService } from 'src/app/Servicios/InfoCliente/info-cliente.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetOrderDetailService } from 'src/app/Servicios/DetallePedido/get-order-detail.service';

@Component({
  selector: 'app-area-cliente',
  templateUrl: './area-cliente.component.html',
  styleUrls: ['./area-cliente.component.scss']
})
export class AreaClienteComponent implements OnInit {

  private userData: any = [];

  public nombre: string = '';
  public primerAp: string = '';
  public segundoAp: string = '';
  public email: string = '';
  public telefono: string = '';
  public direccion: string = '';
  public fechaYhora: string = '';
  public fecha: string = '';
  public hms: string = '';

  public mostrarDetalle: boolean = false;

  public gastoTotalPedido: number = 0;

  private pedidosObject: any = {};
  public pedidosArray: any[] = [];


  constructor(private areaCliente: InfoClienteService, private router: Router, private cookie: CookieService, private detallePedido: GetOrderDetailService) { }




  ngOnInit(): void {
    this.areaCliente.infoUsuario$.subscribe(datosUser => {

      this.userData = datosUser;
      this.nombre = this.userData[0].nombre;
      this.primerAp = this.userData[0].primer_apellido;
      this.segundoAp = this.userData[0].segundo_apellido;
      this.email = this.userData[0].correo;
      this.telefono = this.userData[0].telefono;
      this.direccion = this.userData[0].direccion;
      this.fechaYhora = this.userData[0].fecha;
      let fechaSplit = this.fechaYhora.split('T');
      this.fecha = fechaSplit[0];
      this.hms = fechaSplit[1].substring(0, 9);

    });

  }


  showTab(contenido: string) {
    let contMostrar: any = document.getElementById(contenido);
    let contOcultar: any = document.getElementsByClassName("content");

    for (let i = 0; i < contOcultar.length; i++) {
      contOcultar[i].classList.remove("active");
    }

    contMostrar.classList.add("active");
  }


  logOut() {
    localStorage.removeItem('tokenSesion');
    this.cookie.delete('nombreUsuario');
    this.router.navigate(['/home']);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


  irAcuenta() {
    this.router.navigate(['areaCliente']);
  }

  getPedidos() {
    this.pedidosArray = [];

    this.detallePedido.getOrders().subscribe(data => {
      this.pedidosObject = data;
      for (let i = 0; i < this.pedidosObject.length; i++) {
        this.pedidosArray.push(this.pedidosObject[i]);
        let fechaYhora = this.pedidosArray[i].fecha;
        let fechaSplit = fechaYhora.split('T');
        let fecha = fechaSplit[0];
        let hms = fechaSplit[1].substring(0, 8);
        this.pedidosArray[i].fecha = fecha;
        this.pedidosArray[i].hora = hms;
      }
    });
  }

  irAdetalle(idPedido: any) {
    let divDetallePedido: any = document.getElementById("hero-detallePedidos");

    if (!divDetallePedido) {
      this.mostrarDetalle = true;
      this.router.navigate(['areaCliente', { outlets: { 'detallePedido': ['detallePedido', idPedido] } }]);
    } else {
      this.mostrarDetalle = false;
    }

  }

}
