import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/services/PessoaService';
import { Pessoa } from 'src/app/model/Pessoa';

@Component({
    selector: 'pessoa',
    templateUrl: './pessoa.component.html',
    styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
    listaPessoas: Pessoa[] = []
    displayedColumns = [
        'idPessoa',
        'nmPessoa',
        'cpf',
        'dtNascimento',
        'acoes',
    ]

    constructor(
        private service: PessoaService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.service.findAll().subscribe(data => this.listaPessoas = data)
    }

    delete(pessoa: Pessoa) {
        this.service.delete(pessoa)
    }

    edit(pessoa: Pessoa) {
        this.router.navigate(['/pessoas/nova', {id: pessoa.idPessoa}])
    }
}
