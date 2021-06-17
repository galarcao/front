import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovaPessoaComponent } from './views/pessoa/nova/nova-pessoa.component';
import { PessoaComponent } from './views/pessoa/pessoa.component';

const routes: Routes = [
  { path: 'pessoa', component: PessoaComponent },
  { path: 'pessoa/nova', component: NovaPessoaComponent },
  { path: 'pessoa/nova/:id', component: NovaPessoaComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
