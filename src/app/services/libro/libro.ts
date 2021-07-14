import { Injectable } from '@angular/core';
import { libro } from '../../models/libro/libro';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../Auth/AuthService';

@Injectable({ providedIn: 'root' })
export class LibroProvider {
  nombre=this.auth.getEmail().split("@");
  mail=this.auth.getEmail().replace(".","");
  listaLibros=this.db.list<libro>('listaLibros'+this.mail);

  constructor( private auth:AuthService,private db:AngularFireDatabase) {
    
  }

  addItem(p:libro){
    return this.listaLibros.push(p);
  }

  getItemList(){
    return this.listaLibros;
  }

  editItem(p:libro){
    return this.listaLibros.update(p.key,p);
  }

  borrarItem(p:libro){
    return this.listaLibros.remove(p.key);
  }
}
