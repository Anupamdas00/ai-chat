import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/serivces/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  query!: string;
  constructor(private apiService: ApiService) {}
  chatHistory : any[] = []
  loading! : boolean;

  ngOnInit(): void {
    this.apiService.getQueries().subscribe((res: any) => this.chatHistory.push(res))
    this.apiService.loaderObs.subscribe(res => this.loading = res)
  }

  sendPromt(text : string){
    this.apiService.generateText(text.trim());
    this.query = ""
  }

}
