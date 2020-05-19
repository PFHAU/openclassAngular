import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService{

  appareilsSubject = new Subject<any[]>();

    private appareils = [
        {
          id: 1,
          name: 'Machine à laver',
          status: 'éteint'
        },
        {
          id: 2,
          name: 'Frigo',
          status: 'allumé'
        },
        {
          id: 3,
          name: 'Ordinateur',
          status: 'éteint'
        }
      ]

    constructor(private httpClient: HttpClient) { }
      
    emitAppareilSubject(){
      this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnAll(){
        for (let machine of this.appareils){
            machine.status = 'allumé'
        }
    }
    switchOffAll(){
        for (let machine of this.appareils){
            machine.status = 'éteint'
        }
    }
    switchOnOne(i: number){
      this.appareils[i].status='allumé'
  }
    switchOffOne(i: number){
      this.appareils[i].status='éteint'
  }

  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (s) => {
        return s.id ===id;
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name:'',
      status
    };
    appareilObject.name=name;
    appareilObject.status=status;
    appareilObject.id=this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  //http methods:

  saveAppareilToServer(){
    this.httpClient
    .put("https://openclass-1432c.firebaseio.com/appareils.json", this.appareils)
    .subscribe(
      ()=>{
        console.log('Enregistrement Terminé!')
      },
      (error)=>{
        console.log('Erreur ! : ' + error)
      }
    );
  }

  getAppareilsFromServer(){
    this.httpClient.get<any[]>('https://openclass-1432c.firebaseio.com/appareils.json')
    .subscribe((response)=>{
    this.appareils = response;
    this.emitAppareilSubject();
    },
    (error)=>{
      console.log('Erreur ! : ' + error);
        }
    );
  }

}