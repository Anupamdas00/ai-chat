import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apikey : string = "AIzaSyCg1ObOik32zbPHofuiNC2oBPV1Cm7kDSM";
  messageHistory : BehaviorSubject<any> = new BehaviorSubject(null)

  private genAi = new GoogleGenerativeAI(this.apikey)
  private model = this.genAi.getGenerativeModel({ model : "gemini-1.5-flash" })

  constructor() { 
    
  }

  async getResponse(prompt : string): Promise<Observable<any>>{
    console.log('My prompt :', prompt);
    const result = await this.model.generateContent(prompt);
    const res = result.response;
    console.log(res);
    this.messageHistory.next({
      role : 'bot',
      text : res.text()
    })

    return this.messageHistory.asObservable()
  }

}
  