import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StitchService } from 'src/app/services/stitch/stitch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private stitch: StitchService
  ) { }

  ngOnInit() {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
