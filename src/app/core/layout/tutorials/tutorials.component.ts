import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'fury-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

  constructor(
    public loginService: LoginService,
  ) { }

  ngOnInit() {
  }

}
