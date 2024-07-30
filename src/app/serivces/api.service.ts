import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apikey : string = environment.apikey

  messageHistory : Subject<any> = new Subject();
  loader : BehaviorSubject<boolean> = new BehaviorSubject(false)
  loaderObs = this.loader.asObservable()

  private genAi = new GoogleGenerativeAI(this.apikey)
  private model = this.genAi.getGenerativeModel({ model : "gemini-1.5-flash" })

  constructor() { 
  }

  async generateText(prompt : string): Promise<void>{
    console.log('My prompt :', prompt);

    this.messageHistory.next({
      role : 'user',
      text : prompt
    })
    this.loader.next(true)
    const result = await this.model.generateContent(prompt);
    const res = result.response;
    if(res){
      this.loader.next(false);
    }
    this.messageHistory.next({
      role : 'bot',
      text : res.text()
    })
  }

  getQueries(){
    return this.messageHistory.asObservable()
  }

}
  