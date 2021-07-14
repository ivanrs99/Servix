import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, ModalController } from '@ionic/angular';
import { film } from '../../models/pelicula/pelicula';
import { PeliculaProvider } from '../../services/pelicula/pelicula';
import { AccionProvider } from '../../services/accion/accion';
import { accion } from '../../models/accion/accion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  peli:film={
    Titulo: "",
    Puntuacion:"",
    Categoria:""
  };

  a:accion={
    evento:""
  }

  constructor(private alerta:AlertController, private modalCtrl:ModalController, public navParams: NavParams,private peliculas:PeliculaProvider,private accion:AccionProvider, private toast:ToastController) {
  }

  async cerrarModal(){
    await this.modalCtrl.dismiss();
  }

  guardar(peli:film){
    if(this.peli.Titulo=="" || this.peli.Puntuacion=="" || this.peli.Categoria==""){
      this.alert();
    }else{
      this.peliculas.editItem(peli);
      this.a.evento="Has editado la película "+this.peli.Titulo;
      this.accion.addItem(this.a);
      this.cerrarModal();
      this.mensaje("Película editada correctamente.");
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
    this.peli = this.navParams.data.object;
  }
}
