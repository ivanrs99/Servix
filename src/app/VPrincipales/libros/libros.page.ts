import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LibroProvider } from '../../services/libro/libro';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { libro } from '../../models/libro/libro';
import { accion } from '../../models/accion/accion';
import { AccionProvider } from '../../services/accion/accion';
import { Modal3Page } from 'src/app/VModales/modal3/modal3.page';
import { Edit3Page } from 'src/app/VEditar/edit3/edit3.page';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {
  cat:string="Todos";
  a:accion={
    evento:""
  }
  libros:Observable<any[]>;
  
  constructor(public libro:LibroProvider, private toast:ToastController, public modalCtrl:ModalController, private accion:AccionProvider) {
    this.libros=this.libro.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        }
      )).reverse()
    }))
  }

  borrar(p:libro){
    this.libro.borrarItem(p);
    this.a.evento="Has borrado el libro "+p.Titulo;
    this.accion.addItem(this.a);
    this.mensaje("Libro borrado correctamente");
  }

  categoriaElegida(){
    console.log(this.cat);
    if(this.cat=='Todos'){
      this.libros=this.libro.getItemList().snapshotChanges().pipe (map ( changes => {
        return changes.map ( c=>(
          {
            key: c.payload.key,
            ...c.payload.val(),
          }))
        })
      )
    }else{
      this.libros=this.libros.pipe(map(arr =>
        arr.filter( r => r.Categoria === this.cat )
      ))
    }
    
  }
  
  async abrirModal(){
    const mPage=await this.modalCtrl.create({
      component: Modal3Page
    });
    return await mPage.present();
  }

  async abrirModalEdit(item:libro){
    const mPage=await this.modalCtrl.create({
      component: Edit3Page,
      componentProps:{
        "object":item
      }
    });
    return await mPage.present();
  }

  mensaje (texto:string)
  {
    this.toast.create({
      message: texto,
      duration: 1300
    }).then((toastData)=>{
      toastData.present();
    });
  }

  ngOnInit() {
  }
}
