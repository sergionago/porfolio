import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Servicios/LoginUsuario/login.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { InfoClienteService } from 'src/app/Servicios/InfoCliente/info-cliente.service';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  public correo: string = '';
  public pass: string = '';
  public mensaje_servidor: string = '';
  public resultadoSubscripcionMensaje: Subscription = Subscription.EMPTY;
  public resultadoSubscripcionNombre: Subscription = Subscription.EMPTY;
  public sesionIniciada: boolean = false;
  public nombreUsuario: any = this.cookie.get("nombreUsuario");


  constructor(private router: Router, private login: LoginService, private cookie: CookieService, private areaCliente: InfoClienteService) { }


  ngOnInit(): void {
    this.searchToken();
    this.resultadoSubscripcionMensaje = this.login.resultadoLogin$.subscribe((mensaje) => {
      this.mensaje_servidor = JSON.stringify(mensaje);

      if (this.mensaje_servidor === `"Iniciando sesión..."`) {
        setTimeout(() => {
          window.location.reload();
          this.searchToken();
        }, 1000);
      }

    });
  }

  showDivForm() {
    let divMostrar: any = document.getElementById("login_div");
    let divMostrarLoged: any = document.getElementById("sesionIniciadaDiv");
    let LSsesion: any = localStorage.getItem("tokenSesion");

    if (LSsesion != null && LSsesion != undefined) {
      if (divMostrarLoged.classList.contains("active")) {
        divMostrarLoged.classList.remove("active");
      } else {
        divMostrarLoged.classList.add("active");
      }
    } else {
      if (divMostrar.classList.contains("active")) {
        divMostrar.classList.remove("active");
      } else {
        divMostrar.classList.add("active");
      }
    }
  }

  showLoggedForm() {
    let divMostrar: any = document.getElementById("sesionIniciadaDiv");

    if (divMostrar.classList.contains("active")) {
      divMostrar.classList.remove("active");
    } else {
      divMostrar.classList.add("active");
    }

  }

  hideDivForm() {
    let divOcultar: any = document.getElementById("login_div");
    let divOcultarLogged: HTMLElement | null = document.getElementById("sesionIniciadaDiv");

    if (divOcultar !== null && divOcultar.classList.contains("active")) {
      divOcultar.classList.remove("active");
    }

    if (divOcultarLogged !== null && divOcultarLogged.classList.contains("active")) {
      divOcultarLogged.classList.remove("active");
    }

  }

  onLogin() {
    const userData: object = {
      correo: this.correo,
      pass: this.pass
    }

    this.login.iniciarSesion(userData);
  }

  searchToken() {
    const token = localStorage.getItem('tokenSesion');

    if (token) {
      this.sesionIniciada = true;
    } else {
      this.sesionIniciada = false;
    }

  }

  logOut() {
    localStorage.removeItem('tokenSesion');
    this.cookie.delete('nombreUsuario');
    this.router.navigate(['/home']);

    setTimeout(() => {
      window.location.reload();
    }, 200);

  }

  irAregistro() {
    this.router.navigate(['/registro']);
  }

  irAreaClientes() {
    const token: string | null = localStorage.getItem('tokenSesion');

    if (token != null && token != undefined) {
      this.areaCliente.getInfoUser(token);
      this.router.navigate(['/areaCliente']);
    }
  }
}
