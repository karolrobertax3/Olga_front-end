import { Produtos } from "./Produtos"

export class Usuario {
    public idUsuario: number
    public nomeRazaoSocial: string
    public cpfCnpj: string
    public email: string
    public telefone: string
    public endereco: string
    public numero: string
    public cidade: string
    public uf: string
    public cep: string
    public senha: string
    public foto: string
    public fotoLoja: string
    public valorCompra: string
    public doacao: string
    public minhasCompras: Produtos[]
    public meusProdutos: Produtos[]
}