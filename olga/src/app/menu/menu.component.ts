import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  id = environment.idUsuario
  foto = environment.foto
  nome = environment.nome
  listaProdutos: Produtos[]
  titulo: string
  tituloProd: string

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  teste(){
    console.log(environment.idUsuario)
    console.log(environment.foto)
    console.log(environment.nome)
  }

  findAllProdutos(){
    this.usuarioService.getAllProdutos().subscribe((resp: Produtos[]) =>{
      this.listaProdutos = resp
      console.log(resp)
    })
  }

  findByTituloProduto(){

    if(this.tituloProd == ''){
      this.findAllProdutos()
    } else {
      this.usuarioService.getByNomeProduto(this.tituloProd).subscribe((resp: Produtos[]) =>{
        this.listaProdutos = resp
      })
    }
  }
}
