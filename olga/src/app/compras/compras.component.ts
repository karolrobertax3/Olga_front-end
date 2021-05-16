import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { ProdutosComponent } from '../produtos/produtos.component';
import { AlertasService } from '../service/alertas.service';
import { UsuarioService } from '../service/usuario.service';

interface itemCarrinho { 
  idProduto: number;
  idUser: number;
  quantidade: number;
  titulo: string;
  preco: number;
  precoTotal: number
}

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
  totalCompras = new Array<itemCarrinho>()
  titulo: string
  qtdCompras: number
  tituloProd: string
  totalValorCarrinho: number

  idProduto: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService : UsuarioService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/inicio'])
      this.alertas.showAlertDanger('Sua sessão expirou. Faça o login novamente!')
    }
    this.findAllProdutos()
    console.log(this.idUser.toString())
  }

  findAllProdutos(){
    this.usuarioService.getAllProdutos().subscribe((resp: Produtos[]) =>{
      this.listaProdutos = resp
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

  findByTituloProduto(){

    if(this.tituloProd == ''){
      this.findAllProdutos()
    } else {
      this.usuarioService.getByNomeProduto(this.tituloProd).subscribe((resp: Produtos[]) =>{
        this.listaProdutos = resp
      })
    }
  }

  cadastrarProduto(){
    this.produto.organico = this.organico
  

    this.usuarioService.novoProduto(this.produto, this.idUser).subscribe((resp: Produtos)=>{
      this.produto = resp
      this.alertas.showAlertSuccess('Produto cadastrado com sucesso!')
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

  comprarProduto({ idProduto, idUser, quantidade }: itemCarrinho){
    this.usuarioService.comprarProduto(idProduto, idUser, quantidade).subscribe((resp: Produtos) => {
    this.produto = resp
    this.produto = new Produtos()
    this.qtdCompras = 0
     })
    
  }

  atualizarCarrinho({ idProduto, titulo, preco }: Produtos){
    if(!this.qtdCompras || Number(this.qtdCompras) === 0) return;
    const itemCarrinho = {
      idProduto: Number(idProduto),
      idUser: Number(this.idUser),
      quantidade: Number(this.qtdCompras),
      titulo,
      precoTotal: preco * Number(this.qtdCompras),
      preco
    }
    const produtoEncontrado = this.totalCompras.find(item => item.idProduto === idProduto)
    if(produtoEncontrado){
      const index = this.totalCompras.indexOf(produtoEncontrado)
      this.totalCompras[index].quantidade+=Number(this.qtdCompras)
      this.totalCompras[index].precoTotal = this.totalCompras[index].preco * this.totalCompras[index].quantidade
    } else {
      this.totalCompras.push(itemCarrinho)
    }
    this.totalValorCarrinho = Object.values(this.totalCompras).reduce((acc, cur) => acc+cur.precoTotal,0)
    console.log(this.totalCompras)
    console.log(this.totalValorCarrinho)
    this.qtdCompras = 0
  }

// listar itens carrinho
  produtosCarrinho(){
    return this.totalCompras
  }
//comprar itens carrinho
  comprar(){
    if(this.totalCompras.length <=0){
      this.alertas.showAlertDanger('O carrinho está vazio')
      return;
    } else {
      this.totalCompras.map(item => {
        this.comprarProduto(item)
        this.alertas.showAlertSuccess('Compra realizada com sucesso!')
        this.totalValorCarrinho = 0
      })
    }
    this.totalCompras = []
    window.scroll(0,0)
  }
}
