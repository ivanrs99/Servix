import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { SerieProvider } from '../../../providers/serie/serie';
import { serie } from '../../models/serie/serie';
import { AccionProvider } from '../../../providers/accion/accion';
import { accion } from '../../models/accion/accion';

@IonicPage()
@Component({
  selector: 'page-series',
  templateUrl: 'series.html',
})
export class SeriesPage {
  cat:string="Todos";
  a:accion={
    evento:""
  }
  lista:Observable<any[]>;
  constructor(public serie:SerieProvider,private toast:ToastController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams,private accion:AccionProvider, public actionSheetCtrl: ActionSheetController) {
    this.lista=this.serie.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        }
      )
      ).reverse()
    }))
  }

  categoriaElegida(){
    console.log(this.cat);
    if(this.cat=='Todos'){
      this.lista=this.serie.getItemList().snapshotChanges().pipe (map ( changes => {
        return changes.map ( c=>(
          {
            key: c.payload.key,
            ...c.payload.val(),
          }
        ))
      }))
    }else{
      this.lista=this.lista.pipe(map(arr =>
        arr.filter( r => r.Categoria === this.cat )
      ))
    }    
  }

  borrar(p:serie){
    this.serie.borrarItem(p);
    this.a.evento="Has borrado la serie "+p.Titulo;
    this.accion.addItem(this.a);
    this.mensaje("Serie borrada correctamente");
  }

  abrirModal(){
    var mPage=this.modalCtrl.create('Modal2Page');
    mPage.present();
  }

  abrirModalEdit(item:serie){
    this.navCtrl.setRoot('Edit2Page', item);
  }

  mensaje (texto:string)
  {
    const toast = this.toast.create({
      message: texto,
      duration: 1300
    });
    toast.present();
  }

  pop(item:serie) {
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
