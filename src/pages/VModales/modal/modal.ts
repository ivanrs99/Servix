import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { film } from '../../models/pelicula/pelicula';
import { PeliculaProvider } from '../../../providers/pelicula/pelicula';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AccionProvider } from '../../../providers/accion/accion';
import { accion } from '../../models/accion/accion';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  titulo:string;
  puntuacion:string;
  cat:string;

  peli:film={
    Titulo:"",
    Puntuacion:"",
    Categoria:""
  }
  a:accion={
    evento:""
  }
  list:Observable<film[]>;

  

  constructor(public navCtrl: NavController, public alerta:AlertController, public navParams: NavParams,public viewCtrl : ViewController, private pelicula:PeliculaProvider, private accion:AccionProvider, private toast:ToastController) {
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
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  guardar(){  
      if(this.titulo!=null && this.puntuacion!=null && this.cat!=null){
        if(this.titulo!="" && this.puntuacion!="" && this.cat!=""){
          this.peli.Titulo=this.titulo;
          this.peli.Puntuacion=this.puntuacion;
          this.peli.Categoria=this.cat;        
          this.a.evento="Has añadido la película "+this.peli.Titulo;
          this.mensaje("Película añadida correctamente.");
          this.pelicula.addItem(this.peli);
          this.accion.addItem(this.a);
          this.viewCtrl.dismiss();
        }else{
          let alert=this.alerta.create({
            title:'¡ERROR!',
            subTitle:'Has dejado algún campo sin completar',
            buttons:['OK']
          });
          alert.present();
        }        
      }else{
        let alert=this.alerta.create({
          title:'¡ERROR!',
          subTitle:'Has dejado algún campo sin completar',
          buttons:['OK']
        });
        alert.present();
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
