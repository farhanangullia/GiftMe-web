import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../_models/alert';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})


export class AlertComponent {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getAlert().subscribe((alert: Alert) => {
          if (!alert) {
              // clear alerts when an empty alert is received
              this.alerts = [];
              return;
          }

          // show only latest alert
          this.alerts[0] = alert;
      });
  }

  removeAlert(alert: Alert) {
      this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
      if (!alert) {
          return;
      }

      // return css class based on alert type
      switch (alert.type) {
          case AlertType.Success:
              return 'alert alert-success';
          case AlertType.Error:
              return 'alert alert-danger';
          case AlertType.Info:
              return 'alert alert-info';
          case AlertType.Warning:
              return 'alert alert-warning';
      }
  }
}
