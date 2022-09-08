/** @class app/pages/admin/dashboard */

/**
 * @description Dashboard page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Require node modules
import * as moment from 'moment';
import * as _ from 'lodash';
// Require models
import { ListColumn } from 'app/shared/list/list-column.model';
// Require services
import { StatsService } from 'app/services/stats.service';
import { LoginService } from '../../../services/login.service';


// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ StatsService ]
})
export class DashboardComponent implements OnInit {
  // Start and end date to get period stats
  start: Date = moment().subtract(1,'month').toDate();
  end: Date = moment().add(1,'day').toDate();

  // Global stats results
  globalStats: any;
  // Period stats results
  periodStats: any;
  
  
  // Initialize component
  constructor(
    private loginService: LoginService,
    private statsService: StatsService
  ) {
    // this.loginService.loading = true;
  }

  ngOnInit() {
    // Get global stats data from backend
    this.statsService.getGlobalStats().subscribe(
      res => {
        if ( res && res.data ) {
          this.globalStats = res.data;
        } else {
          this.loginService.displayMessage('Ha ocurrido un error al obtener la información');
        }
      },
      err => {
        console.log( err );
        this.loginService.displayMessage('Ha ocurrido un error al obtener la información');
      }
    );
      // Function that get period stats
    this.getServiceData();
      
  }

  // Function that get period stats
  getServiceData() {

    if ( moment(this.start).isAfter(this.end) ) {
      alert('La fecha inicial es mayor a la fecha final');
      return;
    }
    // Get data from backend
    this.statsService.getPeriodStats( moment(this.start).format('YYYY-MM-DD'), moment(this.end).format('YYYY-MM-DD') ).forEach( res => {
    
    });
    
  }

  

}