import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  produto : Produtos = new Produtos
  organico : boolean 
  idUser = environment.idUsuario
  listaProdutos: Produtos[]

  constructor(
    private router: Router,
    private usuarioService : UsuarioService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/inicio'])
      alert('Sua sessão expirou. Faça o login novamente!')
    }
    this.findAllProdutos()
  }

  findAllProdutos(){
    this.usuarioService.getAllProdutos().subscribe((resp: Produtos[]) =>{
      this.listaProdutos = resp
    })
  }

  cadastrarProduto(){
    this.produto.organico = this.organico
  

    this.usuarioService.novoProduto(this.produto, this.idUser).subscribe((resp: Produtos)=>{
      this.produto = resp
      alert('Produto cadastrado com sucesso!')
      this.findAllProdutos()
      this.produto = new Produtos()
    })
  }

  tipoProduto(event: any){
    this.organico = event.target.value
  }

  categoriaProduto(event:any){
    this.produto.categoria = event.target.value
  }

}
