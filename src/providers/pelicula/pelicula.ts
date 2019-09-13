import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { film } from '../../pages/models/pelicula/pelicula';
import { AuthService } from '../../services/AuthService';

@Injectable()
export class PeliculaProvider {
  nombre=this.auth.getEmail().split("@");
  mail=this.auth.getEmail().replace(".","");
  listaPeliculas=this.db.list<film>('listaPeliculas'+this.mail);

  constructor( private auth:AuthService,private db:AngularFireDatabase) {
    
  }

  addItem(p:film){
    return this.listaPeliculas.push(p);
  }

  getItemList(){
    return this.listaPeliculas;
  }

  editItem(p:film){
    return this.listaPeliculas.update(p.key,p);
  }

  borrarItem(p:film){
    return this.listaPeliculas.remove(p.key);
  }
}
