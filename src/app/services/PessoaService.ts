import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pessoa } from "../model/Pessoa";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {
    urlBase = 'http://localhost:8080'

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>(`${this.urlBase}/pessoas`)
    }

    create(pessoa: Pessoa) {
        return this.http.post<Pessoa>(`${this.urlBase}/pessoas`, pessoa).toPromise()
    }

    delete(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.delete<Pessoa>(`${this.urlBase}/pessoa/${pessoa.idPessoa}`)
    }

    update(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.put<Pessoa>(`${this.urlBase}/pessa`, pessoa)
    }

    findById(id: number): Observable<Pessoa> {
        return this.http.get<Pessoa>(`${this.urlBase}/pessoa/${id}`)
    }
}