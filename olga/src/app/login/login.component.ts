import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.foto = this.usuarioLogin.foto
      environment.nome = this.usuarioLogin.nome
      environment.email = this.usuarioLogin.email
      environment.fotoLoja = this.usuarioLogin.fotoLoja

      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.fotoLoja)
      console.log(environment.email)

      this.router.navigate(['/loja'])

    }, erro => {
      if(erro.status == 500) {
        alert('Usuário ou senha estão incorretos!')
      }
    })
  }

}
