import { Component } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-HeaderCarousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.scss'],
  providers:[NgbCarouselConfig]
})
export class HeaderCarouselComponent {
  imagenes=[
  '../../assets/imagenes/Header/imgHeader1.png',
  '../../assets/imagenes/Header/imgHeader2.png',
  '../../assets/imagenes/Header/imgHeader3.png',
  '../../assets/imagenes/Header/imgHeader4.png',
  '../../assets/imagenes/Header/imgHeader5.png'
];


constructor(config:NgbCarouselConfig){
  config.interval=3000;
  config.showNavigationIndicators=false;
  config.showNavigationArrows=false;
}
}

