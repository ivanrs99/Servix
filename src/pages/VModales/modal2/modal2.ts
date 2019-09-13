import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { serie } from '../../models/serie/serie';
import { SerieProvider } from '../../../providers/serie/serie';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AccionProvider } from '../../../providers/accion/accion';
import { accion } from '../../models/accion/accion';

@IonicPage()
@Component({
  selector: 'page-modal2',
  templateUrl: 'modal2.html',
})
export class Modal2Page {
  titulo:string;
  puntuacion:string;
  cat:string;

  s:serie={
    Titulo:"",
    Puntuacion:"",
    Categoria:""
  }
  a:accion={
    evento:""
  }

  list:Observable<serie[]>;
  constructor(public navCtrl: NavController, public alerta:AlertController, public navParams: NavParams,public viewCtrl : ViewController, private serie:SerieProvider, private accion:AccionProvider, private toast:ToastController) {
    this.list=this.serie.getItemList().snapshotChanges().pipe (map ( changes => {
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
        this.s.Titulo=this.titulo;
        this.s.Puntuacion=this.puntuacion;
        this.s.Categoria=this.cat;
        this.a.evento="Has añadido la serie "+this.s.Titulo;
        this.mensaje("Serie añadida correctamente.");
        this.serie.addItem(this.s);
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
