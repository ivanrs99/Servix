import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(email,pass) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(email,pass);
	}

	signUp(email,pass) {
		console.log('Sign in with email');
		return this.afAuth.auth.createUserWithEmailAndPassword(email,pass);
	}

	getEmail(){
		return this.user.email;
	}

	singOut(): Promise<void>{
		return this.afAuth.auth.signOut();
	}
}