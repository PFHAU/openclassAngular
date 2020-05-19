import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import {AppareilService} from './services/appareil.service';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //secondes: number;
  counterSubscription: Subscription;

  constructor(private appareilService: AppareilService){
    setTimeout(
      () =>{
        
      }, 4000
    );
  }

  ngOnInit(){
    const counter = Observable.interval(1000);
    counter.subscribe(
      /*(value)=>{
        this.secondes=value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      } */
    );
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
 
}
