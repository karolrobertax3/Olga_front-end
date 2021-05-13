import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  id = environment.idUsuario
  foto = environment.foto
  nome = environment.nome

  constructor() { }

  ngOnInit(): void {
  }

  teste(){
    console.log(environment.idUsuario)
    console.log(environment.foto)
    console.log(environment.nome)
  }
}
