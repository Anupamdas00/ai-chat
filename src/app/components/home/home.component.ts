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

  ngOnInit(): void {}

  getQueries() {
    if (this.query.length > 0) {
      this.apiService.getResponse(this.query.trim()).then((res) => {
        res.subscribe({
          next: (value) => console.log(value),
          error: (err) => console.log(err),
        });
      });
    }
  }
}
