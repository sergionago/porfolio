import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MarketArt';


  constructor(private router: Router) { this.home(); }

  //Para que navegue por defecto a la ruta /home al recargar la página
  home() {
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }

}
