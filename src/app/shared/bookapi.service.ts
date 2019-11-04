import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookapiService {

  url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:9788434413474';
  constructor(
    private http: HttpClient,
  ) { }

  // Con este método haremos la petición para buscar un libro por ISBN en la API de Google
  getLibroByIsbn(isbn) {
    return this.http.get(this.url);
  }
}
