import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/store/session';
import { VarietyService, VarietyQuery } from 'src/app/store/variety';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
