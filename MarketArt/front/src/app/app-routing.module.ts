import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { ProductListComponent } from './Componentes/product-list/product-list.component';
import { ProductDetailComponent } from './Componentes/product-detail/product-detail.component';
import { AreaClienteComponent } from './Componentes/nav-bar/user-account/area-cliente/area-cliente.component';
import { DetallePedidoComponent } from './Componentes/nav-bar/user-account/area-cliente/detalle-pedido/detalle-pedido.component';
import { FormalizarPedidoComponent } from './Componentes/nav-bar/shopping-cart/formalizar-pedido/formalizar-pedido.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent }, //Pongo home por preferencia, realmente solo cambia lo referente a product-list
  { path: 'registro', component: RegistroComponent },
  { path: 'productDetail/:productCat/:productID', component: ProductDetailComponent },
  {path: 'areaCliente', component: AreaClienteComponent, children: [
      { path: 'detallePedido/:idPedido', component: DetallePedidoComponent, outlet: 'detallePedido' }]},
  { path: 'realizarPedido', component: FormalizarPedidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
