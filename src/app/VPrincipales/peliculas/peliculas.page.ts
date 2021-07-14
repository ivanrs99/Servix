import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from '@ionic/angular';
import { film } from '../../models/pelicula/pelicula';
import { PeliculaProvider } from '../../services/pelicula/pelicula';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { AccionProvider } from '../../services/accion/accion';
import { accion } from '../../models/accion/accion';
import { EditPage } from 'src/app/VEditar/edit/edit.page';
import { ModalPage } from 'src/app/VModales/modal/modal.page';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class PeliculasPage implements OnInit {

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
              })).reverse()
            }))
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
          }))
      }))
    }else{
      this.list=this.list.pipe(map(arr =>
        arr.filter( r => r.Categoria === this.cat )
      ))
    }    
  }

  async abrirModal(){
    const mPage=await this.modalCtrl.create({
      component: ModalPage
    });
    return await mPage.present();
  }

  async abrirModalEdit(item:film){
    const mPage=await this.modalCtrl.create({
      component: EditPage,
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
