import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit {
  @ViewChildren(
    'customMapCanvas, pointsOfInterestCanvas, waypointCanvas, currentPositionCanvas'
  )
  canvases: QueryList<ElementRef>;

  mapCanvas: HTMLCanvasElement;
  mapCtx: any;

  interestCanvas: HTMLCanvasElement;
  interestCtx: any;

  waypointCanvas: HTMLCanvasElement;
  waypointCtx: any;

  positionCanvas: HTMLCanvasElement;
  positionCtx: any;

  longitude: any;
  latitude: any;
  selectedInterval: any; // Interval timer reference

  minLati: any;
  maxLati: any;
  minLong: any;
  maxLong: any;
  interestsNearHome: any;
  school: any;
  areaOfComicCon: any;
  comicConWithParking: any;

  selectedValue: string = 'home';

  constructor() {
    // Define the bounds of your custom map (latitude and longitude ranges)
    this.minLati = null;
    this.maxLati = null;
    this.minLong = null;
    this.maxLong = null;

    this.interestsNearHome = [
      { name: 'Cortemich', long: 5.935610946448381, lati: 50.88151687599166 },
      { name: 'Vista', long: 5.957520487154052, lati: 50.879880755492394 },
      { name: 'Home', long: 5.962028109710039, lati: 50.89898910306564 },
      { name: 'KFC', long: 5.942374996318874, lati: 50.898274193967715 },
    ];

    this.school = [
      { name: 'btoren', long: 5.956770157841158, lati: 50.87961628637714 },
      { name: '1Toren', long: 5.956740739055312, lati: 50.879830219484134 },
      { name: '2Toren', long: 5.9570268175765815, lati: 50.87989251622947 },
      { name: '3Toren', long: 5.957330286612787, lati: 50.880465317663955 },
      { name: '4Toren', long: 5.957246083801952, lati: 50.87958370314573 },
      { name: '5Toren', long: 5.957564361065603, lati: 50.880045574522995 },
      { name: 'place', long: 5.957074834623431, lati: 50.87957829348195 },
    ];

    this.areaOfComicCon = [
      { name: 'CornerS', long: 4.676325, lati: 52.339576 },
      { name: 'CornerW', long: 4.675023, lati: 52.340251 },
      { name: 'CornerN', long: 4.677942, lati: 52.342315 },
      { name: 'CornerE', long: 4.679134, lati: 52.341541 },
    ];
    this.comicConWithParking = [
      { name: 'CornerS', long: 4.676325, lati: 52.339576 },
      { name: 'CornerW', long: 4.675023, lati: 52.340251 },
      { name: 'CornerN', long: 4.677942, lati: 52.342315 },
      { name: 'CornerE', long: 4.679134, lati: 52.341541 },
      { name: 'ParkingS', long: 4.676325, lati: 52.339576 },
      { name: 'ParkingW', long: 4.674252, lati: 52.340695 },
      { name: 'ParkingN', long: 4.681172, lati: 52.3455 },
      { name: 'ParkingE', long: 4.684852, lati: 52.343579 },
    ];
  }

  ngAfterViewInit() {
    this.canvases.forEach((canvas, index) => {
      var canvasElement = canvas.nativeElement as HTMLCanvasElement;
      var ctx = canvasElement.getContext('2d');

      if (index === 0) {
        this.mapCanvas = canvasElement;
        this.mapCtx = ctx;
      } else if (index === 1) {
        this.interestCanvas = canvasElement;
        this.interestCtx = ctx;
      } else if (index === 2) {
        this.waypointCanvas = canvasElement;
        this.waypointCtx = ctx;
      } else if (index === 3) {
        this.positionCanvas = canvasElement;
        this.positionCtx = ctx;
      }
    });

    this.drawBackground();
    this.getCanvasSize();
    this.getLocation();
    this.markPointsOfInterest();
    this.startPeriodicSelection(100);
  }

  drawBackground() {
    this.mapCtx.moveTo(0, 60);
    this.mapCtx.lineTo(175, 60);
    this.mapCtx.moveTo(175, 60);
    this.mapCtx.lineTo(240, 40);
    this.mapCtx.moveTo(240, 40);
    this.mapCtx.lineTo(310, 40);
    this.mapCtx.moveTo(310, 40);
    this.mapCtx.lineTo(360, 25);
    this.mapCtx.moveTo(360, 25);
    this.mapCtx.lineTo(400, 25);

    this.mapCtx.moveTo(0, 335);
    this.mapCtx.lineTo(50, 335);
    this.mapCtx.moveTo(50, 335);
    this.mapCtx.lineTo(110, 335);
    this.mapCtx.moveTo(110, 335);
    this.mapCtx.lineTo(125, 350);
    this.mapCtx.moveTo(125, 350);
    this.mapCtx.lineTo(185, 350);
    this.mapCtx.moveTo(185, 350);
    this.mapCtx.lineTo(200, 340);
    this.mapCtx.moveTo(200, 340);
    this.mapCtx.lineTo(255, 340);
    this.mapCtx.moveTo(255, 340);
    this.mapCtx.lineTo(275, 325);
    this.mapCtx.moveTo(275, 325);
    this.mapCtx.lineTo(330, 325);
    this.mapCtx.moveTo(330, 325);
    this.mapCtx.lineTo(365, 350);
    this.mapCtx.moveTo(365, 350);
    this.mapCtx.lineTo(400, 350);

    this.mapCtx.lineWidth = 1;
    this.mapCtx.strokeStyle = '#ff9205';
    this.mapCtx.stroke();
  }

  onSelectionChange() {
    // Clear the canvas before redrawing
    this.clearCanvas();

    // Update and redraw the canvas based on the selected value
    this.drawBackground();
    this.getCanvasSize();
    this.markPointsOfInterest();
    this.drawCurrentPosition(this.longitude, this.latitude);
  }

  clearCanvas() {
    // Clear the canvas by resetting its width
    this.mapCanvas.width = this.mapCanvas.width;
    this.interestCanvas.width = this.interestCanvas.width;
    this.positionCanvas.width = this.positionCanvas.width;
  }

  getCanvasSize() {
    let offSet005 = 0.005;
    let offSet0005 = 0.0005;
    let offSet0001 = 0.0001;

    if (this.selectedValue === 'home') {
      this.minLong =
        Math.min(
          this.interestsNearHome[0].long,
          this.interestsNearHome[1].long,
          this.interestsNearHome[2].long,
          this.interestsNearHome[3].long
        ) - offSet005;

      this.minLati =
        Math.min(
          this.interestsNearHome[0].lati,
          this.interestsNearHome[1].lati,
          this.interestsNearHome[2].lati,
          this.interestsNearHome[3].lati
        ) - offSet005;

      this.maxLong =
        Math.max(
          this.interestsNearHome[0].long,
          this.interestsNearHome[1].long,
          this.interestsNearHome[2].long,
          this.interestsNearHome[3].long
        ) + offSet005;

      this.maxLati =
        Math.max(
          this.interestsNearHome[0].lati,
          this.interestsNearHome[1].lati,
          this.interestsNearHome[2].lati,
          this.interestsNearHome[3].lati
        ) + offSet005;
    }

    if (this.selectedValue === 'school') {
      this.minLong =
        Math.min(
          this.school[0].long,
          this.school[1].long,
          this.school[2].long,
          this.school[3].long,
          this.school[4].long,
          this.school[5].long
        ) - offSet0001;

      this.minLati =
        Math.min(
          this.school[0].lati,
          this.school[1].lati,
          this.school[2].lati,
          this.school[3].lati,
          this.school[4].lati,
          this.school[5].lati
        ) - offSet0001;

      this.maxLong =
        Math.max(
          this.school[0].long,
          this.school[1].long,
          this.school[2].long,
          this.school[3].long,
          this.school[4].long,
          this.school[5].long
        ) + offSet0001;

      this.maxLati =
        Math.max(
          this.school[0].lati,
          this.school[1].lati,
          this.school[2].lati,
          this.school[3].lati,
          this.school[4].lati,
          this.school[5].lati
        ) + offSet0001;
    }

    if (this.selectedValue === 'comiccon') {
      this.minLong =
        Math.min(
          this.areaOfComicCon[0].long,
          this.areaOfComicCon[1].long,
          this.areaOfComicCon[2].long,
          this.areaOfComicCon[3].long
        ) - offSet0001;

      this.minLati =
        Math.min(
          this.areaOfComicCon[0].lati,
          this.areaOfComicCon[1].lati,
          this.areaOfComicCon[2].lati,
          this.areaOfComicCon[3].lati
        ) - offSet0001;

      this.maxLong =
        Math.max(
          this.areaOfComicCon[0].long,
          this.areaOfComicCon[1].long,
          this.areaOfComicCon[2].long,
          this.areaOfComicCon[3].long
        ) + offSet0001;

      this.maxLati =
        Math.max(
          this.areaOfComicCon[0].lati,
          this.areaOfComicCon[1].lati,
          this.areaOfComicCon[2].lati,
          this.areaOfComicCon[3].lati
        ) + offSet0001;
    }

    if (this.selectedValue === 'comicconparking') {
      this.minLong =
        Math.min(
          this.comicConWithParking[0].long,
          this.comicConWithParking[1].long,
          this.comicConWithParking[2].long,
          this.comicConWithParking[3].long,
          this.comicConWithParking[4].long,
          this.comicConWithParking[5].long,
          this.comicConWithParking[6].long,
          this.comicConWithParking[7].long
        ) - offSet0005;

      this.minLati =
        Math.min(
          this.comicConWithParking[0].lati,
          this.comicConWithParking[1].lati,
          this.comicConWithParking[2].lati,
          this.comicConWithParking[3].lati,
          this.comicConWithParking[4].lati,
          this.comicConWithParking[5].lati,
          this.comicConWithParking[6].lati,
          this.comicConWithParking[7].lati
        ) - offSet0005;

      this.maxLong =
        Math.max(
          this.comicConWithParking[0].long,
          this.comicConWithParking[1].long,
          this.comicConWithParking[2].long,
          this.comicConWithParking[3].long,
          this.comicConWithParking[4].long,
          this.comicConWithParking[5].long,
          this.comicConWithParking[6].long,
          this.comicConWithParking[7].long
        ) + offSet0005;

      this.maxLati =
        Math.max(
          this.comicConWithParking[0].lati,
          this.comicConWithParking[1].lati,
          this.comicConWithParking[2].lati,
          this.comicConWithParking[3].lati,
          this.comicConWithParking[4].lati,
          this.comicConWithParking[5].lati,
          this.comicConWithParking[6].lati,
          this.comicConWithParking[7].lati
        ) + offSet0005;
    }

    console.log(this.minLati, this.maxLati, this.minLong, this.maxLong);
  }

  startPeriodicSelection(interval: number) {
    this.selectedInterval = setInterval(() => {
      this.getLocation();
    }, interval);
  }

  markPointsOfInterest() {
    if (this.selectedValue === 'home') {
      for (let i = 0; i < this.interestsNearHome.length; i++) {
        let x =
          ((this.interestsNearHome[i].long - this.minLong) /
            (this.maxLong - this.minLong)) *
          this.interestCanvas.width;
        let y =
          this.interestCanvas.height -
          ((this.interestsNearHome[i].lati - this.minLati) /
            (this.maxLati - this.minLati)) *
            this.interestCanvas.height;

        // Draw a dot at the calculated coordinates
        this.interestCtx.fillStyle = '#00ffeb'; // Dot color
        this.interestCtx.beginPath();
        this.interestCtx.arc(x, y, 3, 0, 2 * Math.PI);
        this.interestCtx.fill();
      }
    }
    if (this.selectedValue === 'school') {
      for (let i = 0; i < this.school.length; i++) {
        let x =
          ((this.school[i].long - this.minLong) /
            (this.maxLong - this.minLong)) *
          this.interestCanvas.width;
        let y =
          this.interestCanvas.height -
          ((this.school[i].lati - this.minLati) /
            (this.maxLati - this.minLati)) *
            this.interestCanvas.height;

        // Draw a dot at the calculated coordinates
        this.interestCtx.fillStyle = '#00ffeb'; // Dot color
        this.interestCtx.beginPath();
        this.interestCtx.arc(x, y, 3, 0, 2 * Math.PI);
        this.interestCtx.fill();
      }
    }
    if (this.selectedValue === 'comiccon') {
      for (let i = 0; i < this.areaOfComicCon.length; i++) {
        let x =
          ((this.areaOfComicCon[i].long - this.minLong) /
            (this.maxLong - this.minLong)) *
          this.interestCanvas.width;
        let y =
          this.interestCanvas.height -
          ((this.areaOfComicCon[i].lati - this.minLati) /
            (this.maxLati - this.minLati)) *
            this.interestCanvas.height;

        // Draw a dot at the calculated coordinates
        this.interestCtx.fillStyle = '#00ffeb'; // Dot color
        this.interestCtx.beginPath();
        this.interestCtx.arc(x, y, 3, 0, 2 * Math.PI);
        this.interestCtx.fill();
      }
    }
    if (this.selectedValue === 'comicconparking') {
      for (let i = 0; i < this.comicConWithParking.length; i++) {
        let x =
          ((this.comicConWithParking[i].long - this.minLong) /
            (this.maxLong - this.minLong)) *
          this.interestCanvas.width;
        let y =
          this.interestCanvas.height -
          ((this.comicConWithParking[i].lati - this.minLati) /
            (this.maxLati - this.minLati)) *
            this.interestCanvas.height;

        // Draw a dot at the calculated coordinates
        this.interestCtx.fillStyle = '#00ffeb'; // Dot color
        this.interestCtx.beginPath();
        this.interestCtx.arc(x, y, 3, 0, 2 * Math.PI);
        this.interestCtx.fill();
      }
    }
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.processPosition(this.longitude, this.latitude);
        },
        function error() {
          alert('An error occured with the navigation system!');
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      alert('No support for geolocation');
    }
  }

  processPosition(longitude: number, latitude: number) {
    let coords = `longitude south->north ${longitude} & latitude west->east ${latitude}`;

    // Calculate the x and y coordinates on the canvas
    let x =
      ((longitude - this.minLong) / (this.maxLong - this.minLong)) *
      this.positionCanvas.width;
    let y =
      this.positionCanvas.height -
      ((latitude - this.minLati) / (this.maxLati - this.minLati)) *
        this.positionCanvas.height;

    console.log('translated x, y: ' + x, y);

    // Calculate x if out of bounds
    if (x < 0) {
      x = 1;
    }
    if (x > this.positionCanvas.width) {
      x = this.positionCanvas.width - 1;
    } else {
      x = x;
    }

    // Calculate y if out of bounds
    if (y < 0) {
      y = 1;
    }
    if (y > this.positionCanvas.height) {
      y = this.positionCanvas.height - 1;
    } else {
      y = y;
    }
    console.log('processed x, y: ' + x, y);

    console.log(coords);
    this.drawCurrentPosition(x, y);
  }

  drawCurrentPosition(x: number, y: number) {
    // remove position dot before drawing next one
    this.positionCtx.clearRect(
      0,
      0,
      this.positionCanvas.width,
      this.positionCanvas.height
    );

    // Draw a dot at the calculated coordinates
    this.positionCtx.fillStyle = '#ff9205'; // Dot color
    this.positionCtx.beginPath();
    this.positionCtx.arc(x, y, 4, 0, 2 * Math.PI);
    this.positionCtx.fill();
  }

  setWaypoint() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.processPosition(this.longitude, this.latitude);
        },
        function error() {
          alert('An error occured with the navigation system!');
        },
        { maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      alert('No support for geolocation');
    }

    // Calculate the x and y coordinates on the canvas
    let x =
      ((this.longitude - this.minLong) / (this.maxLong - this.minLong)) *
      this.waypointCanvas.width;
    let y =
      this.waypointCanvas.height -
      ((this.latitude - this.minLati) / (this.maxLati - this.minLati)) *
        this.waypointCanvas.height;

    // Draw a dot at the calculated coordinates
    this.waypointCtx.fillStyle = '#f60200'; // Dot color
    this.waypointCtx.beginPath();
    this.waypointCtx.arc(x, y, 3, 0, 2 * Math.PI);
    this.waypointCtx.fill();
  }
}
