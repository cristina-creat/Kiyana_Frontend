import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'fury-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() back: boolean = false;
  @Input() title: string;
  @Input() current: string;
  @Input() crumbs: any[];

  constructor(
    public loginService: LoginService
  ) {
  }

  ngOnInit() {
  }

}
