import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Produto } from "../produto.model";
import { ProdutoService } from "../produto.service";

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

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

  update():void {
    this.service.update(this.produto).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/produtos`]);
      this.service.mensagem('Produto atualizado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/produtos`]);
      this.service.mensagem('Falha ao atualizar produto! Tente mais tarde..')
    })
  }

  getMessage() {
    if (this.marca.invalid) {
      return "O campo MARCA deve conter entre 3 e 100 carateres";
    }

    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 carateres";
    }

    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 2.000.000 carateres";
    }

    return false;
  }
}