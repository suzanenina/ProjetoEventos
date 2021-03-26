import { Component, OnInit } from '@angular/core';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  _filtroLista: string = '';

  get filtroLista(): string
  {
    return this._filtroLista;
  }
  set filtroLista(value: string)
  {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ?
      this.filtrarEventos(this.filtroLista) :
      this.eventos;
  }

  eventosFiltrados: any = [];
  eventos : any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;


  constructor(private eventoService: EventoService) {}

  ngOnInit()
  {
    this.getEventos();
  }

  alternarImagem()
  {
    this.mostrarImagem = !this.mostrarImagem;
  }

  filtrarEventos(filtrarPor:string): any
  {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  getEventos() {
    this.eventoService.getEvento().subscribe(
      (response) => {
        this.eventos = response;
        console.log(this.eventos);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
