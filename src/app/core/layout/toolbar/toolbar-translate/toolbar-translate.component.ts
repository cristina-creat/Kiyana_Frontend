import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../../../shared/list.animation';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'fury-toolbar-translate',
  templateUrl: './toolbar-translate.component.html',
  styleUrls: ['./toolbar-translate.component.scss'],
  animations: [...LIST_FADE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTranslateComponent implements OnInit {

  isOpen: boolean;
  languages: any[];
  selectedLanguage: any;

  constructor(
    public loginService: LoginService,
    private _translateService: TranslateService
  ) {
    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'es',
        title: 'Español',
        flag: 'mex'
      }
    ];
  }

  ngOnInit() {
    this.selectedLanguage = this.languages.find(el =>{
      return (el.id == this.loginService.getLenguage());
    });
    this._translateService.use(this.selectedLanguage.id);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
    this.loginService.changeLenguage(lang.id);
    this.toggleDropdown();
  }

}
