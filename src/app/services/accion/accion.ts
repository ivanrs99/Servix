import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../Auth/AuthService';
import { accion } from '../../models/accion/accion';

@Injectable({ providedIn: 'root' })
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
