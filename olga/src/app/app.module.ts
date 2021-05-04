import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LojaComponent } from './loja/loja.component';
import { ComprasComponent } from './compras/compras.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ProdutosComponent } from './produtos/produtos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarComponent,
    ComprasComponent,
    MenuComponent,
    RodapeComponent,
    LojaComponent,
    ComprasComponent,
    ProdutosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
