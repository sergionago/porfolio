import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderCarouselComponent } from './Componentes/header-carousel/header-carousel.component';
import { NavBarComponent } from './Componentes/nav-bar/nav-bar.component';
import { ProductListComponent } from './Componentes/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './Componentes/nav-bar/shopping-cart/shopping-cart.component';
import { UserAccountComponent } from './Componentes/nav-bar/user-account/user-account.component';
import { MaFooterComponent } from './Componentes/ma-footer/ma-footer.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { HomeComponent } from './Componentes/nav-bar/home/home.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ProductDetailComponent } from './Componentes/product-detail/product-detail.component';
import { AreaClienteComponent } from './Componentes/nav-bar/user-account/area-cliente/area-cliente.component';
import { DetallePedidoComponent } from './Componentes/nav-bar/user-account/area-cliente/detalle-pedido/detalle-pedido.component';
import { FormalizarPedidoComponent } from './Componentes/nav-bar/shopping-cart/formalizar-pedido/formalizar-pedido.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderCarouselComponent,
    NavBarComponent,
    ProductListComponent,
    ShoppingCartComponent,
    UserAccountComponent,
    MaFooterComponent,
    RegistroComponent,
    HomeComponent,
    ProductDetailComponent,
    AreaClienteComponent,
    DetallePedidoComponent,
    FormalizarPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
