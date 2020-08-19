import { Component } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bigdata';

  // Base url
  baseurl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  contar(): void {
    this.GetCount("hola").subscribe(
      response => {
        console.log(response);
      },
      error => this.errorMessage = <any>error
    );
  }

  resultado = null;

  archivos = [
    { valor: '1', muestraValor: 'reut2-001' },
    { valor: '2', muestraValor: 'reut2-002' },
    { valor: '3', muestraValor: 'reut2-003' },
    { valor: '4', muestraValor: 'reut2-004' },
    { valor: '5', muestraValor: 'reut2-005' },
    { valor: '6', muestraValor: 'reut2-006' },
    { valor: '7', muestraValor: 'reut2-007' },
    { valor: '8', muestraValor: 'reut2-008' }
  ];

  seleccionada: string = this.archivos[0].valor;



  GetCount(arch) {
    console.log("entro");
    arch = 'reut2-001';
    console.log(this.http.get<any>(this.baseurl + 'contpalabras?archivo=' + arch)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    )
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}



