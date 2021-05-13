import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produtos } from 'src/app/model/Produtos';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutosEditComponent implements OnInit {

  produtos: Produtos = new Produtos()
  idProdutos: number
  tipoProduto: string


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/produtos'])
      alert('Alteração feita com sucesso!')
    }
    this.idProdutos = this.route.snapshot.params['id']
    this.findByIdProdutos(this.idProdutos)
  }

  produtosDataSafra(event: any){
    this.produtosDataSafra = event.target.value
  }

  produtoTitulo(event: any){
    this.produtoTitulo = event.target.value
  }

  produtoDescricao(event: any){
    this.produtoDescricao = event.target.value
  }

  produtoFotoProduto(event: any){
    this.produtoFotoProduto = event.target.value
  }

  produtoQtdEstoque(event: any){
    this.produtoQtdEstoque = event.target.value
  }

  produtoPreco(event: any){
    this.produtoPreco = event.target.value
  }

  atualizar(){
    this.produtos.categoria = this.tipoProduto

    if (this.produtos.dataSafra != this.produtosDataSafra) {
      alert('Safra do produto não alterada!!!')
    } else {
      this.authService.cadastrar(this.produtos).subscribe((resp: Produtos) =>{
        this.produtos = resp
        this.router.navigate(['/produtos'])
        alert('Safra do produto alterada com sucesso, faça o login novamente')
        environment.token = ''
        environment.foto = ''
        environment.nome =''
        this.router.navigate(['/entrar'])
        
      })
      
    }

  }

  findByIdProdutos(id:number){
    this.authService.getByidProdutos(id).subscribe((resp: Produtos)=>{
      this.produtos = resp
    })
    
  }

}
