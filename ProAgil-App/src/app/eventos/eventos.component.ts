import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

defineLocale('pt-br', ptBrLocale);

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
  //modalRef: BsModalRef = new BsModalRef;
  registerForm: any;

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




  constructor(
    private eventoService: EventoService,
    private modalService : BsModalService,
    private fb : FormBuilder,
    private localService: BsLocaleService

  )
  {
    this.localService.use("pt-br");
  }

  openModal(template: any)
  {
      template.show();
      //this.modalRef = this.modalService.show(template);
  }


  ngOnInit()
  {
    this.validation();
    this.getEventos();

  }

  alternarImagem()
  {
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation(){
    this.registerForm = this.fb.group({
      tema : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dataEvento : ['', Validators.required],
      qtdPessoas : ['',[ Validators.required, Validators.max(1200)]],
      telefone : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]]

    })
  }

  salvarAlteracao(){

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
