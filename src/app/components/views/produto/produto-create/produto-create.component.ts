import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Produto } from "../produto.model";
import { ProdutoService } from "../produto.service";

@Component({
  selector: "app-produto-create",
  templateUrl: "./produto-create.component.html",
  styleUrls: ["./produto-create.component.css"],
})
export class ProdutoCreateComponent implements OnInit {
  id_cat: String = "";

  produto: Produto = {
    id: "",
    marca: "",
    titulo: "",
    texto: "",
  };

  marca = new FormControl("", [Validators.minLength(3)]);
  titulo = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  create(): void {
    this.service.create(this.produto, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/produtos`]);
      this.service.mensagem("Produto criado com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/produtos`]);
      this.service.mensagem("Erro ao criar novo produto! Tente mais tarde!");
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/produtos`]);
  }

  getMessage() {
    if (this.marca.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 carateres";
    }

    if (this.titulo.invalid) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 carateres";
    }

    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 300 carateres";
    }

    return false;
  }
}
