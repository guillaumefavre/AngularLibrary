import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  	  var config = {
	    apiKey: "AIzaSyD6At6hwoSt2Ezxn7C1rgtdji1GZRnuNqE",
	    authDomain: "angularlibrary-ee868.firebaseapp.com",
	    databaseURL: "https://angularlibrary-ee868.firebaseio.com",
	    projectId: "angularlibrary-ee868",
	    storageBucket: "angularlibrary-ee868.appspot.com",
	    messagingSenderId: "519594276556"
	  };
	  firebase.initializeApp(config);
  }
}
