import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  titulo: string
  qtdCompras: number

  idProduto: number


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService : UsuarioService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/inicio'])
      alert('Sua sessão expirou. Faça o login novamente!')
    }
    this.findAllProdutos()
    console.log(this.idUser.toString())
  }

  findAllProdutos(){
    this.usuarioService.getAllProdutos().subscribe((resp: Produtos[]) =>{
      this.listaProdutos = resp
      console.log(resp)
    })
  }

  findOrganicos(){
    this.usuarioService.getOrganicos().subscribe((resp: Produtos[]) =>{
      this.listaProdutos = resp
    })
  }

  findByIdProduto(idProduto: number){
    this.usuarioService.getByIdProduto(idProduto).subscribe((resp: Produtos) =>{
      this.produto = resp
    })
  }
/*tentativa de fazer com parametros ainda não está funcionando*/
  findByTitulo(){
    this.usuarioService.getByNomeProduto(this.titulo).subscribe((resp: Produtos[]) =>{
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

  qtdCompra(event: any){
    this.qtdCompras = event.target.value
  }

  tipoProduto(event: any){
    this.organico = event.target.value
  }

  categoriaProduto(event:any){
    this.produto.categoria = event.target.value
  }

  comprarProduto(idProduto: number){
    this.usuarioService.comprarProduto(idProduto, this.idUser, this.qtdCompras).subscribe((resp: Produtos) => {
      this.produto = resp
      this.produto = new Produtos()
      this.qtdCompras = 0
    })   
  }

}
