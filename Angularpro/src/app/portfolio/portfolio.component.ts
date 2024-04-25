import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProjectCardComponent } from "../project-card/project-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  imports: [ProjectCardComponent, CommonModule]
})
export class PortfolioComponent {
  constructor(private titleService: Title) {

    this.titleService.setTitle('Sunny - Portfolio');
  }
  // pr:{name: String, summary: String}={
  //   name: "",
  //   summary: "",
  // };
  // ngOnInit(){
  //   this.pr = {
  //     name: "Python",
  //     summary: "Konichiwa"
  //   }
  // }
}
