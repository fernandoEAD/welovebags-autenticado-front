import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Produto } from "../produto.model";
import { ProdutoService } from "../produto.service";

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  id_cat: String = "";

  produto: Produto = {
    id: "",
    marca: "",
    titulo: "",
    texto: "",
  };

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.produto.id = this.route.snapshot.paramMap.get("id")!;
    this.findById()
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/produtos`]);
  }

  findById(): void {
    this.service.findById(this.produto.id!).subscribe((resposta) => {
      this.produto = resposta
    })
  }

  delete():void {
    this.service.delete(this.produto.id!).subscribe(() => {
      this.router.navigate([`categorias/${this.id_cat}/produtos`]);
      this.service.mensagem('Produto deletado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/produtos`]);
      this.service.mensagem('Falha ao deletar produto! Tente mais tarde..')
    })
  }

}
