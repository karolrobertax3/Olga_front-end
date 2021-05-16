import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produtos } from '../model/Produtos';
import { AlertasService } from '../service/alertas.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  id = environment.idUsuario
  //foto = environment.foto
  nome = environment.nome
  listaProdutos: Produtos[]
  titulo: string
  tituloProd: string

  constructor(
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
  }

  sair(){
    environment.token = ''
    environment.nome = ''
    //environment.foto = ''
    environment.idUsuario = 0
    this.alertas.showAlertSuccess('Volte sempre!')
    this.router.navigate(['/inicio'])
  }
}
