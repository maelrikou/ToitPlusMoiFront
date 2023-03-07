import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recherche-maison',
  templateUrl: './recherche-maison.component.html',
  styleUrls: ['./recherche-maison.component.css']
})
export class RechercheMaisonComponent implements OnInit {
  maison: any;
  match:any;
  constructor(private http: HttpClient, private authService: AuthService, private route: Router) { };
  private userConnect = this.authService.getUserConnect();

  ngOnInit(): void {
    this.recupAnnonce();
  }

  recupAnnonce() {
    this.http.get('http://localhost:8183/maison/random/' + this.userConnect.id).subscribe({
      next: (data) => { 
        this.maison = data; 
        this.maison = this.maison[0]; 
        console.log(this.maison);
       },
      error: (err) => { console.log(err) }
    })
  }

  likerAnnonce() {
    let val = { id:{likeur: this.userConnect, maisonLiked: this.maison} };
    this.http.post('http://localhost:8183/likemaison', val).subscribe({
      next: (data) => { },
      error: (err) => { console.log(err) }
    });

    //Gestion du match
    let val2 = {maison:this.maison, locataire:this.userConnect};
    this.http.put('http://localhost:8183/matchmaison',val2).subscribe({
      next: (data) => {
        this.match = data;
       },
      error: (err) => { console.log(err) }
    })

    //Tirage de la nouvelle maison
    this.ngOnInit();

    //Animation remonter page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
  }

  haterAnnonce() {
    let val = {id:{ likeur: this.userConnect, maisonLiked: this.maison} };
    this.http.post('http://localhost:8183/hatemaison', val).subscribe({
      next: (data) => { },
      error: (err) => { console.log(err) }
    });

    //Tirage maison
    this.ngOnInit();

    //Animation remonter page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}