import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { LibroProvider } from '../../../providers/libro/libro';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { libro } from '../../models/libro/libro';
import { accion } from '../../models/accion/accion';
import { AccionProvider } from '../../../providers/accion/accion';


@IonicPage()
@Component({
  selector: 'page-libros',
  templateUrl: 'libros.html',
})
export class LibrosPage {
  cat:string="Todos";
  a:accion={
    evento:""
  }
  libros:Observable<any[]>;
  constructor(public libro:LibroProvider, private toast:ToastController, public actionSheetCtrl: ActionSheetController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams,private accion:AccionProvider) {
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
          }
        ))
      }))
    }else{
      this.libros=this.libros.pipe(map(arr =>
        arr.filter( r => r.Categoria === this.cat )
      ))
    }    
  }
  
  abrirModal(){
    var mPage=this.modalCtrl.create('Modal3Page');
    mPage.present();
  }

  abrirModalEdit(item:libro){
    var mPage=this.modalCtrl.create('Edit3Page', {data: item});
    mPage.present();
  }

  mensaje (texto:string)
  {
    const toast = this.toast.create({
      message: texto,
      duration: 1300
    });
    toast.present();
  }

  pop(item:libro) {
    const actionSheet = this.actionSheetCtrl.create({
      cssClass:'action-sheets-groups-page',
      buttons: [
        {
          text: 'Editar',
          cssClass:'edit',
          handler: () => {
            this.abrirModalEdit(item)
          }
        },{
          text: 'Borrar',
          cssClass:'borrar',
          role: 'destructive',
          handler: () => {
            this.borrar(item)
          }
        }
      ]
    });
    actionSheet.present();
  }
}