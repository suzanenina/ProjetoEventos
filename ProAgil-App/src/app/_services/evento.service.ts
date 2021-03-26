import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseUrl = 'http://localhost:5000/api/evento';

constructor(private http : HttpClient) { }

getEvento()
{
  return this.http.get(this.baseUrl);


}

}
