import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-recherche-appart',
  templateUrl: './recherche-appart.component.html',
  styleUrls: ['./recherche-appart.component.css']
})
export class RechercheAppartComponent implements OnInit {

  appart: any;
  match: any;
  public afficher = false;
  constructor(private authService: AuthService, private route: Router, private http: HttpClient) { };
  private userConnect = this.authService.getUserConnect();

  ngOnInit(): void {
    this.recupAnnonce();
  }

  recupAnnonce() {
    this.http.get('http://localhost:8183/appartement/random/' + this.userConnect.id).subscribe({
      next: (data) => { 
        this.appart = data;
        this.appart=this.appart[0]; 
        console.log(this.appart);
      },
      error: (err) => { console.log(err) }
    });
    
  }

  likerAnnonce() {
    let val = { id:{likeur: this.userConnect, appartLiked: this.appart} };
    this.http.post('http://localhost:8183/likeappart', val).subscribe({
      next: (data) => { },
      error: (err) => { console.log(err) }
    })

    //Gestion du match
    let val2 = {appart:this.appart, locataire:this.userConnect};
    this.http.put('http://localhost:8183/matchappart',val2).subscribe({
      next: (data) => {
        this.match = data;
       },
      error: (err) => { console.log(err) }
    })
    
    //Tirage du nouvel appart
    this.ngOnInit();

    //Animation remonter la page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  haterAnnonce() {
    let val = { id:{likeur: this.userConnect, appartLiked: this.appart} };
    this.http.post('http://localhost:8183/hateappart', val).subscribe({
      next: (data) => { },
      error: (err) => { console.log(err) }
    });

    //Tirage du nouvel appart
    this.ngOnInit();

    //Animation remonter la page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
