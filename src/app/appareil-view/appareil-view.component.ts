import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit {
    appareils: any[];
    appareilSubscription: Subscription;

    @Input() appareilName: string;
    @Input() appareilStatus: string;
    @Input() index: number;
    @Input() id: number;
    lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private appareilService: AppareilService) { }

  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }
  onEteint() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onFetch(){
    this.appareilService.getAppareilsFromServer();
  }

  onSave(){
    this.appareilService.saveAppareilToServer();
  }

  ngOnDestroy(){
    this.appareilSubscription.unsubscribe();
  }

}
