import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { film } from '../../../pages/models/pelicula/pelicula';
import { PeliculaProvider } from '../../../providers/pelicula/pelicula';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { AccionProvider } from '../../../providers/accion/accion';
import { accion } from '../../models/accion/accion';

@IonicPage()
@Component({
  selector: 'page-peliculas',
  templateUrl: 'peliculas.html',
})
export class PeliculasPage {
  cat:string="Todos";

  a:accion={
    evento:""
  }

  list:Observable<any[]>;
  constructor(public pelicula:PeliculaProvider, public modalCtrl:ModalController, private toast:ToastController,
              public navCtrl: NavController, public navParams: NavParams,private accion:AccionProvider) {
    this.list=this.pelicula.getItemList().snapshotChanges().pipe (map ( changes => {
            return changes.map ( c=>(
              {
                key: c.payload.key,
                ...c.payload.val(),
              }
            )
            ).reverse()
          }
        )
        )
  }
  
  borrar(p:film){
    this.pelicula.borrarItem(p);
    this.a.evento="Has borrado la película "+p.Titulo;
    this.accion.addItem(this.a);
    this.mensaje("Película borrada correctamente");
  }

  categoriaElegida(){
    console.log(this.cat);
    if(this.cat=='Todos'){
      this.list=this.pelicula.getItemList().snapshotChanges().pipe (map ( changes => {
        return changes.map ( c=>(
          {
            key: c.payload.key,
            ...c.payload.val(),
          }
        )
        )
     }
     )
     )
    }else{
      this.list=this.list.pipe(map(arr =>
        arr.filter( r => r.Categoria === this.cat )
      ))
    }
    
  }

  abrirModal(){
    var mPage=this.modalCtrl.create('ModalPage');
    mPage.present();
  }

  abrirModalEdit(item:film){
    this.navCtrl.setRoot('EditPage', item);
  }

  mensaje (texto:string)
  {
    const toast = this.toast.create({
      message: texto,
      duration: 1300
    });
    toast.present();
  }
}
