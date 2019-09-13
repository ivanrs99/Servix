import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/AuthService';
import { accion } from '../../pages/models/accion/accion';

@Injectable()
export class AccionProvider {
  nombre=this.auth.getEmail().split("@");
  mail=this.auth.getEmail().replace(".","");
  listaAcciones=this.db.list<accion>('listaAcciones'+this.mail);

  constructor( private auth:AuthService,private db:AngularFireDatabase) {
  }

  addItem(p:accion){
    return this.listaAcciones.push(p);
  }

  getItemList(){
    return this.listaAcciones;
  }
}
