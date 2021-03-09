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
  @ViewChild(QrScannerComponent, {static: false }) qrScannerComponent: QrScannerComponent;

  URL: any;
  constructor(private http: HttpClient, private auth: AuthService, private router: Router/*, private qrScannerComponent:QrScannerComponent*/) {}


  ngOnInit(): void {

  }



  ngAfterViewInit(): void {

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
          console.log("Detecto mas de una camara")
        } else {
          /*El Array viene por defecto en la documentación a [0] pero como detecta 2 camaras le asigno el [1]
            que es la webcam el problema es que deberia entrar en el if choosendev
          */
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          console.log("entro detecto una camara")
        }
      }
    });


   this.qrScannerComponent.capturedQr.subscribe((data) => {
     console.log("Entro en lectura")
      console.log(data);

       /*this.auth.authScan(data).subscribe((res: any) =>{

       })*/
    });

    let result = this.auth.authScan();
/*
    if(result) {

      this.router.navigate([''], { queryParams: { login: result } })

    }*/

    //})


  }

  }



