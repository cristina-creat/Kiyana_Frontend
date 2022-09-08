import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-progress',
  templateUrl: './file-progress.component.html',
  styleUrls: ['./file-progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() file: any;
  constructor() {
    
  }

  ngOnInit() {
    console.log( this.file );
    if ( !this.file.progress ) {
      this.file.progress = 0;
    }
  }
}
