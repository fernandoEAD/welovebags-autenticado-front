// import { NgModule } from "@angular/core";
// import { Routes, RouterModule } from "@angular/router";
// import { HomeComponent } from "./components/views/home/home.component";
// import { CategoriaReadComponent } from "./components/views/categoria/categoria-read/categoria-read.component";
// import { CategoriaCreateComponent } from "./components/views/categoria/categoria-create/categoria-create.component";
// import { CategoriaDeleteComponent } from "./components/views/categoria/categoria-delete/categoria-delete.component";
// import { CategoriaUpdateComponent } from "./components/views/categoria/categoria-update/categoria-update.component";
// import { ProdutoCreateComponent } from './components/views/produto/produto-create/produto-create.component';
// import { ProdutoDeleteComponent } from './components/views/produto/produto-delete/produto-delete.component';
// import { ProdutoReadAllComponent } from './components/views/produto/produto-read-all/produto-read-all.component';
// import { ProdutoReadComponent } from './components/views/produto/produto-read/produto-read.component';
// import { ProdutoUpdateComponent } from './components/views/produto/produto-update/produto-update.component';
// import { LoginComponent } from "./components/views/login/login.component";
// import { LoginGuard } from "./auth/login.guard";

// const routes: Routes = [
  
//   // {path: "", redirectTo: "login", pathMatch: 'full'},
  
//   {path: "login", component: LoginComponent},

//   {path: "", component: HomeComponent, canActivate: [LoginGuard], children: [
//   {
//     path: "home",
//     component: HomeComponent,

//   },
//   {
//     path: "categorias",
//     component: CategoriaReadComponent,
//   },
//   {
//     path: "categorias/create",
//     component: CategoriaCreateComponent,

//   },
//   {
//     path: "categorias/delete/:id",
//     component: CategoriaDeleteComponent,

//   },
//   {
//     path: "categorias/update/:id",
//     component: CategoriaUpdateComponent,

//   },
//   {
//     path: 'categorias/:id_cat/produtos',
//     component: ProdutoReadAllComponent,

//   },
//   {
//     path: 'categorias/:id_cat/produtos/create',
//     component: ProdutoCreateComponent,

//   },
//   {
//     path: 'categorias/:id_cat/produtos/:id/update',
//     component: ProdutoUpdateComponent,

//   },
//   {
//     path: 'categorias/:id_cat/produtos/:id/delete',
//     component: ProdutoDeleteComponent,

//   },
//   {
//     path: 'categorias/:id_cat/produtos/:id/read',
//     component: ProdutoReadComponent,
//   }
//   ]}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}


import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/views/home/home.component";
import { CategoriaReadComponent } from "./components/views/categoria/categoria-read/categoria-read.component";
import { CategoriaCreateComponent } from "./components/views/categoria/categoria-create/categoria-create.component";
import { CategoriaDeleteComponent } from "./components/views/categoria/categoria-delete/categoria-delete.component";
import { CategoriaUpdateComponent } from "./components/views/categoria/categoria-update/categoria-update.component";
import { ProdutoCreateComponent } from './components/views/produto/produto-create/produto-create.component';
import { ProdutoDeleteComponent } from './components/views/produto/produto-delete/produto-delete.component';
import { ProdutoReadAllComponent } from './components/views/produto/produto-read-all/produto-read-all.component';
import { ProdutoReadComponent } from './components/views/produto/produto-read/produto-read.component';
import { ProdutoUpdateComponent } from './components/views/produto/produto-update/produto-update.component';
import { LoginComponent } from "./components/views/login/login.component";
import { LoginGuard } from "./auth/login.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [LoginGuard] },
  { path: "categorias", component: CategoriaReadComponent, canActivate: [LoginGuard] },
  { path: "categorias/create", component: CategoriaCreateComponent, canActivate: [LoginGuard] },
  { path: "categorias/delete/:id", component: CategoriaDeleteComponent, canActivate: [LoginGuard] },
  { path: "categorias/update/:id", component: CategoriaUpdateComponent, canActivate: [LoginGuard] },
  { path: 'categorias/:id_cat/produtos', component: ProdutoReadAllComponent, canActivate: [LoginGuard] },
  { path: 'categorias/:id_cat/produtos/create', component: ProdutoCreateComponent, canActivate: [LoginGuard] },
  { path: 'categorias/:id_cat/produtos/:id/update', component: ProdutoUpdateComponent, canActivate: [LoginGuard] },
  { path: 'categorias/:id_cat/produtos/:id/delete', component: ProdutoDeleteComponent, canActivate: [LoginGuard] },
  { path: 'categorias/:id_cat/produtos/:id/read', component: ProdutoReadComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para 'home' por padrão
  { path: '**', redirectTo: '/home', pathMatch: 'full' } // Redireciona para 'home' se a rota não for encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
