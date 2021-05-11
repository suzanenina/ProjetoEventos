import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  titulo:'Eventos Coco';
  _filtroLista: string = '';
  eventosFiltrados: Evento[] = [];
  eventos : Evento[] = [];
  evento : Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  //modalRef: BsModalRef = new BsModalRef;
  registerForm: any;
  modoSalvar: string = 'post';
  bodyDeletarEvento = '';
  dataEvento: string;
  changeEvent: Event;

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
    private localService: BsLocaleService,
    private toastr: ToastrService

    )
    {
      this.localService.use("pt-br");
    }

    openModal(template: any)
    {
      this.registerForm.reset();
      template.show();
      //this.modalRef = this.modalService.show(template);
    }

    novoEvento(template : any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    editarEvento(evento: Evento, template: any)
    {
       this.modoSalvar = 'put';
       this.evento = evento;
       this.openModal(template);

       this.registerForm.patchValue(this.evento);
      // this.salvarAlteracao(template);
    }

    excluirEvento(evento: Evento, template: any)
    {
       this.openModal(template);
       this.evento = evento;
       this.bodyDeletarEvento = `Tem certeza que deseja excluir o evento: ${evento.tema}, código: ${evento.id} ?`;
    }

    confirmeDelete(template: any)
    {
      this.eventoService.deleteEvento(this.evento.id).subscribe(() =>
      {
        template.hide();
        this.getEventos();
        this.toastr.success('Evento excluído com sucesso!');
      }, error => {
        this.toastr.success('Erro ao excluir evento');
        console.log(error);
      })

    }

    salvarAlteracao(template: any)
    {
      if(this.registerForm.valid)
      {
        if(this.modoSalvar === 'post')
        {
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
            (novoEvento: any) => {
              template.hide();
              this.getEventos();
              this.toastr.success('Evento inserido com sucesso!');
            },
            error => {
              this.toastr.success('Erro ao inserir evento');
              console.log(error);
            }
            );
          }
          else
          {
            this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
            this.eventoService.putEvento(this.evento).subscribe(
              (novoEvento: any) => {

                template.hide();
                this.getEventos();
                this.toastr.success('Evento atualizado com sucesso!');
              },
              error => {
                this.toastr.success('Erro ao atualizar evento');
                console.log(error);
              }
              );

            }
          }
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



    filtrarEventos(filtrarPor:string): Evento[]
    {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
    }

    getEventos() {
      this.eventoService.getAllEventos().subscribe(
        (_eventos: Evento[]) =>
        {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
          console.log(_eventos);
        },
        (error) =>
        {
          console.log(error);
        }
      );
    }

    onFileChange(eventEntrada : Event)
    {
       this.changeEvent = eventEntrada;

       const reader = new FileReader();

       if(this.changeEvent!=null)
       {
          // if(this.changeEvent.target.files)
          // {

          // }

       }


    }

}
