import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostRegistroService } from 'src/app/Servicios/RegistrarUsuario/post-registro.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public mensaje_servidor: string = '';
  public resultado_subscripcion: Subscription = Subscription.EMPTY;

  public nombreReg: string = '';
  public primerApellidoReg: string = '';
  public segundoApellidoReg: string = '';
  public correoReg: string = '';
  public telefonoReg: string = '';
  public direccionReg: string = '';
  public passReg: string = '';


  constructor(private registroService: PostRegistroService, private router: Router) { }

  
  ngOnInit(): void {
    this.resultado_subscripcion = this.registroService.resultadoRegistro$.subscribe((mensaje) => {
      this.mensaje_servidor = JSON.stringify(mensaje);

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);

    });
  }


  onSubmit() {
    const formdata: object = {
      nombre: this.nombreReg,
      primerApellido: this.primerApellidoReg,
      segundoApellido: this.segundoApellidoReg,
      correo: this.correoReg,
      telefono: this.telefonoReg,
      direccion: this.direccionReg,
      pass: this.passReg
    };

    this.registroService.registrarUsuario(formdata);
  }
}
