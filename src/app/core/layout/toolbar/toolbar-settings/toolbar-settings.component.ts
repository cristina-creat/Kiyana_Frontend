import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../../../shared/list.animation';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'fury-toolbar-settings',
  templateUrl: './toolbar-settings.component.html',
  styleUrls: ['./toolbar-settings.component.scss'],
  animations: [...LIST_FADE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSettingsComponent implements OnInit {

  notifications: any[];
  isOpen: boolean;

  constructor(
    public loginService: LoginService
  ) {
  }

  ngOnInit() {
     
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
}
