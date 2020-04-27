import {Component, OnInit} from '@angular/core';
import {AdminServiceService} from '../../admin-service.service';
@Component({
  templateUrl: './log.component.html'
})
export class LogComponent implements OnInit {
  logDetails = [];
  private temporaryValue = [];
  lastUpdateTime: any;
  constructor(private connectionService: AdminServiceService) {}

  ngOnInit() {
    const temporaryValue = [];
    this.connectionService.getLog().subscribe(
      data => {
        // @ts-ignore
        // tslint:disable-next-line:forin
        const dataSize = data.bestcrop.length;
        // @ts-ignore
        // tslint:disable-next-line:forin
        for (const x in data.bestcrop) {
          // @ts-ignore
          this.temporaryValue.push(data.bestcrop[(dataSize - x)]);
        }
        this.logDetails = this.temporaryValue;

        const date: Date = new Date();
        this.lastUpdateTime = date;
      });
  }

  updateTable() {
    window.location.reload();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

}
