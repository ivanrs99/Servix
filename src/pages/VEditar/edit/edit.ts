import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { film } from '../../models/pelicula/pelicula';
import { PeliculaProvider } from '../../../providers/pelicula/pelicula';
import { AccionProvider } from '../../../providers/accion/accion';
import { accion } from '../../models/accion/accion';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  peli:film={
    Titulo: "",
    Puntuacion:"",
    Categoria:""
  };

  a:accion={
    evento:""
  }

  constructor(public navCtrl: NavController, private alerta:AlertController, public navParams: NavParams,private peliculas:PeliculaProvider,private accion:AccionProvider, private toast:ToastController) {
    this.peli = this.navParams.data;
  }

  cerrarModal(){
    this.navCtrl.setRoot('PeliculasPage');
  }

  guardar(peli:film){
    if(this.peli.Titulo=="" || this.peli.Puntuacion=="" || this.peli.Categoria==""){
      let alert=this.alerta.create({
        title:'¡ERROR!',
        subTitle:'Has dejado algún campo sin completar',
        buttons:['OK']
      });
      alert.present();
    }else{
      this.peliculas.editItem(peli);
      this.a.evento="Has editado la película "+this.peli.Titulo;
      this.accion.addItem(this.a);
      this.navCtrl.setRoot('PeliculasPage');
      this.mensaje("Película editada correctamente.");
    }
  }

  mensaje (texto:string)
  {
    const toast = this.toast.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }
}
