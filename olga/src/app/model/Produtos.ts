import { Usuario } from "./Usuario"

export class Produtos {
    public idProduto: number
    public dataSafra: Date
    public titulo: string
    public descricao :string
    public fotoProduto :string
    public organico: Boolean
    public qtdEstoque: number
    public ativo: boolean
    public qtdCompras: number
    public categoria: string
    public preco: number
    public criadoPor: Usuario
    public compradoPor: Usuario[]
}