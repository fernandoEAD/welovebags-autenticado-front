import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl: String = environment.baseUrl

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: String): Observable<Produto[]> {
    const url = `${this.baseUrl}/produtos?categoria=${id_cat}`
    return this.http.get<Produto[]>(url)
  }

  findById(id: String):Observable<Produto>{
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.get<Produto>(url)
  }

  update(produto: Produto):Observable<Produto> {
    const url = `${this.baseUrl}/produtos/${produto.id}`
    return this.http.put<Produto>(url, produto)
  }

  create(produto: Produto, id_cat: String): Observable<Produto> {
    const url = `${this.baseUrl}/produtos?categoria=${id_cat}`
    return this.http.post<Produto>(url, produto)
  }

  delete(id: String):Observable<void> {
    const url = `${this.baseUrl}/produtos/${id}`
    return this.http.delete<void>(url)
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
