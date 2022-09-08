/** @class app/app */

/**
 * @description Component for same named module
 * 
 */

// Require angular dependencies
import { Component } from '@angular/core';
import { SidenavItem } from './core/layout/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from './core/layout/sidenav/sidenav.service';
import { TranslateService } from '@ngx-translate/core';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // Initialize services
  constructor(
    private sidenavService: SidenavService,
    private _translate: TranslateService,
  ) {
    // Define base language, default spanish if not defined
    let userLang = navigator.language.split('-')[0];
    userLang = /(en|de|it|fr|es|be)/gi.test(userLang) ? userLang : 'es';
    this._translate.use(userLang);
  } 
}
