import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EventRegisterService {

  private eventNameStr: string;
  public partialDict: Map<string, any>;
  public shockDict: Array<Date>;
  public epiDict: Array<Date>;
  public antiarrDict: Array<Date>;

  constructor(
    public storage: Storage,
  ) { }

  async rcpEventStart(startTime: Date){
    this.partialDict= new Map;
    this.shockDict = new Array;
    this.epiDict = new Array;
    this.antiarrDict = new Array;
    this.eventNameStr = startTime.toString();
    this.partialDict.set('start', startTime);
  }
  async rcpEventEnds(endTime: Date){
    this.partialDict.set('end', endTime);
    this.partialDict.set('shock', this.shockDict);
    this.partialDict.set('epi', this.epiDict);
    this.partialDict.set('antiarr', this.antiarrDict);
    await this.storage.set(this.eventNameStr, this.partialDict);
    this.allevents();
  }
  schockEvent(shockTime: Date){
    this.shockDict.push(shockTime)
  }
  drugEvent(drug: string, drugTime: Date){
    if (drug === 'epi'){
      this.epiDict.push(drugTime)
    }
    if(drug === 'amio' || drug === 'lido'){
      this.antiarrDict.push(drugTime)
    }
  }
  async allevents(){
    console.log(await this.storage.get(this.eventNameStr));

  }

}

