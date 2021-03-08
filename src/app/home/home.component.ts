import { AuthService } from './../service/auth.service';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

  URL: any;
  constructor(private http: HttpClient, private auth: AuthService, private router: Router/*, private qrScannerComponent:QrScannerComponent*/) {}


  ngOnInit(): void {


  }



  ngAfterViewInit() {

    this.qrScannerComponent.getMediaDevices().then((devices) => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });


   this.qrScannerComponent.capturedQr.subscribe((data) => {
      console.log(data);

       /*this.auth.authScan(data).subscribe((res: any) =>{


    });*/

    let result = this.auth.authScan();

    if(result) {

      this.router.navigate([''], { queryParams: { login: result } })

    }

    })


  }

  }



