import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, ModalController } from '@ionic/angular';
import { libro } from '../../models/libro/libro';
import { LibroProvider } from '../../services/libro/libro';
import { accion } from '../../models/accion/accion';
import { AccionProvider } from '../../services/accion/accion';

@Component({
  selector: 'app-edit3',
  templateUrl: './edit3.page.html',
  styleUrls: ['./edit3.page.scss'],
})
export class Edit3Page implements OnInit {
  l:libro={
    Titulo: "",
    Puntuacion:"",
    Categoria:""
  };
  a:accion={
    evento:""
  }

  constructor(private alerta:AlertController, private modalCtrl:ModalController, private navParams: NavParams, private libros:LibroProvider,private accion:AccionProvider, private toast:ToastController) {
  }

  async cerrarModal(){
    await this.modalCtrl.dismiss();
  }

  guardar(l:libro){
    if(this.l.Titulo=="" || this.l.Puntuacion=="" || this.l.Categoria==""){
      this.alert();
    }else{
      this.libros.editItem(l);
      this.a.evento="Has editado el libro "+this.l.Titulo;
      this.accion.addItem(this.a);
      this.cerrarModal();
      this.mensaje("Libro editado correctamente.");
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
    this.l = this.navParams.data.object;
  }
}
