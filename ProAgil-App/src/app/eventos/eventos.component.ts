import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  _filtroLista: string = '';
  eventosFiltrados: Evento[] = [];
  eventos : Evento[] = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;


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




  constructor(private eventoService: EventoService) {}

  ngOnInit()
  {
    this.getEventos();
  }

  alternarImagem()
  {
    this.mostrarImagem = !this.mostrarImagem;
  }

  filtrarEventos(filtrarPor:string): Evento[]
  {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  getEventos() {
    this.eventoService.getAllEventos().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
