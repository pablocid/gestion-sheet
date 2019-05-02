import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StitchService } from './services/stitch/stitch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ana-desk';
  constructor(
    private router: Router,
    private stitch: StitchService
  ) { }

  ngOnInit() {
    this.stitch.isLoggedIn$.subscribe(x => {
      // console.log('log', x);
      if (!x) {
        this.router.navigate(['login']);
      }
    });
  }

}
