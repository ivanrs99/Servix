import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/AuthService';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';
import { PeliculasPage } from '../pages/VPrincipales/peliculas/peliculas';
import { SeriesPage } from '../pages/VPrincipales/series/series';
import { LibrosPage } from '../pages/VPrincipales/libros/libros';
import { CacheProvider } from '../providers/cache/cache';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  newStyle = false;
  currentColor: string;

  constructor(platform: Platform, private cache:CacheProvider,private auth:AuthService, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();

      this.cache.recuperar_mail();
      if(this.cache.mail!=null && this.cache.pass!=null){
        this.auth.signInWithEmail(this.cache.mail,this.cache.pass).then(
          () => this.nav.setRoot(PrincipalPage),
        );
      }else this.nav.setRoot(HomePage);  

      splashScreen.hide();
    });

    //MODO OSCURO
    this.cache.recuperar_modo();
    let oscuro=this.cache.oscuro;
    if(oscuro=="active"){
      this.newStyle = !this.newStyle;
      this.currentColor="dark";
    }
  }

  color() {
    this.cache.modo_oscuro();
    this.newStyle = !this.newStyle;
    if(this.currentColor=="dark"){
      this.currentColor="light";
    }else this.currentColor="dark";
  }

  irHome(){
    this.auth.singOut();
    this.cache.guardar_mail(null);
    this.cache.guardar_pass(null);
    this.nav.setRoot(HomePage);  
  }

  irSeries(){
    this.nav.setRoot(SeriesPage);  
  }

  irLibros(){
    this.nav.setRoot(LibrosPage);  
  }

  irInicio(){
    this.nav.setRoot(PrincipalPage);  
  }

  irPeliculas(){
    this.nav.setRoot(PeliculasPage);  
  }
}

