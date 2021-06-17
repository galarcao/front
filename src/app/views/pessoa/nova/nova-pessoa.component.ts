import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from 'src/app/services/PessoaService';
import { Pessoa } from 'src/app/model/Pessoa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'nova-pessoa',
    templateUrl: './nova-pessoa.component.html',
    styleUrls: ['./nova-pessoa.component.css']
})
export class NovaPessoaComponent implements OnInit {
    control!: FormGroup;
    idPessoa: number | undefined;
    pessoa: Pessoa | undefined;

    constructor(
        private service: PessoaService,
        private route: ActivatedRoute,
        private router: Router,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.idPessoa = Number(this.route.snapshot.paramMap.get('id'))
        this.service.findById(this.idPessoa).subscribe(data => this.pessoa = data ? data : undefined)
        this.control = this._formBuilder.group({
            name: [this.pessoa ? this.pessoa.nmPessoa : '', Validators.required],
            cpf: [this.pessoa ? this.pessoa.cpf : '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]],
            dtNascimento: [this.pessoa ? this.pessoa.dtNascimento : '', Validators.required],
        });
    }

    myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getTime()
        return day < Date.now()
    }

    valid() {
        return this.control.valid
    }

    async submit() {
        await this.service.create({
            nmPessoa: this.control.value.name,
            cpf: this.control.value.cpf,
            dtNascimento: this.control.value.dtNascimento,
        } as Pessoa).then(() => this.router.navigate(['/pessoa']))
            .catch(err => console.log(err))
    }
}
