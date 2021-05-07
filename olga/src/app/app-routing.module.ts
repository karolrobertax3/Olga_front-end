import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras/compras.component';
import { InicioComponent } from './inicio/inicio.component';
import { LojaComponent } from './loja/loja.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'loja', component: LojaComponent},
  {path: 'compras', component: ComprasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
