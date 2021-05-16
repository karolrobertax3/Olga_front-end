import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario: Usuario = new Usuario()
  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  confirmarSenha: string
  estado: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  estadoCadastro(event: any){
    this.estado = event.target.value
  }

  cadastrar() {
    this.usuario.uf = this.estado
    if(this.usuario.senha != this.confirmarSenha) {
     this.alertas.showAlertDanger("As senhas não coincidem.")
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
       // this.router.navigate(['/login'])
      this.alertas.showAlertSuccess("Usuário cadastrado com sucesso!")
      })
    }
  }

  entrar(){
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp
      environment.idUsuario = this.usuarioLogin.idUsuario
      environment.token = this.usuarioLogin.token
      environment.foto = this.usuarioLogin.foto
      environment.nome = this.usuarioLogin.nome
      environment.email = this.usuarioLogin.email
      environment.fotoLoja = this.usuarioLogin.fotoLoja
      this.router.navigate(['/compras'])
      //this.alertas.showAlertSuccess('Seja bem vindo!')

    }, erro => {
      if(erro.status == 500) {
      this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }
    })
  }

}
