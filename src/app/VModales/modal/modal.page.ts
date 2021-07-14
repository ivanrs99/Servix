import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController, AlertController } from '@ionic/angular';
import { film } from '../../models/pelicula/pelicula';
import { PeliculaProvider } from '../../services/pelicula/pelicula';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AccionProvider } from '../../services/accion/accion';
import { accion } from '../../models/accion/accion';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
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

  constructor(public alerta:AlertController, public navParams: NavParams,private modalCtrl: ModalController, private pelicula:PeliculaProvider, private accion:AccionProvider, private toast:ToastController) {
    this.list=this.pelicula.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        }))
      }))
  }

  async cerrarModal(){
    await this.modalCtrl.dismiss();
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
          this.cerrarModal();
        }else{
          this.alert();
        }        
      }else{
        this.alert();
      }
  }

  mensaje (texto:string)
  {
    this.toast.create({
      message: texto,
      duration: 3000
    }).then((toastData)=>{
      toastData.present();
    });
  }

  async alert(){
    const alert= await this.alerta.create({
      message:'¡ERROR!',
      subHeader:'Has dejado algún campo sin completar',
      buttons:['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }
}
