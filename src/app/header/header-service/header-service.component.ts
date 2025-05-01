import { Component } from '@angular/core';
import { HeaderServiceContactInfo, HeaderServiceServices } from 'src/assets/interfaces/header.interfaces';

@Component({
  selector: 'app-header-service',
  templateUrl: './header-service.component.html',
  styleUrls: ['./header-service.component.scss']
})
export class HeaderServiceComponent {

  contactInfo:HeaderServiceContactInfo = {
    contactInfoNumber: "+995 588-11-20-11",
    contactInfoEmail: "mataradze.alex@gmail.com"
  }

  services:HeaderServiceServices = {
    ServicesInstallment: "ონლაინ განვადება",
    ServicesDelivery: "მიწოდება",
    ServicesLanguage:{
      LanguageImg: 'assets/images/geo-flag.png',
      Language: 'GEO'
    }
  }

}
