import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
usuario : Usuario = new Usuario
produto : Produtos = new Produtos

  constructor(
    private http:HttpClient
  ) { }

  token = {
    headers: new HttpHeaders({'Authorization': environment.token, 'Content-Type':'application/json'})
  }
  
  getAllProdutos(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>('http://localhost:8080/produtos', this.token)
  }

  getOrganicos(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>('http://localhost:8080/produtos/organicos?organicos=true', this.token)
  }
 
  getByNomeProduto(titulo: string): Observable<Produtos[]>{
    return this.http.get<Produtos[]>(`http://localhost:8080/produtos/nome/${titulo}`, this.token)
  }

  getByIdProduto(idProduto: number): Observable<Produtos>{
    return this.http.get<Produtos>(`http://localhost:8080/produtos/${idProduto}`, this.token)
  }

  getAllProdutores():Observable<Usuario>{
    return this.http.get<Usuario>('http://localhost:8080/usuarios/nome',this.token)
  }

  novoProduto(produto:Produtos, id_Usuario:number):Observable<Produtos>{
    let url = "http://localhost:8080/usuarios/produto/novo/"
    return this.http.post<Produtos>(url+id_Usuario,produto,this.token)
  }

  comprarProduto(idProduto: number, idUsuario: number, qtdCompras:number): Observable<Produtos>{
    return this.http.put<Produtos>(`http://localhost:8080/usuarios/produto/compra/${idProduto}/${idUsuario}/${qtdCompras}`, this.token)
  }
  
}

