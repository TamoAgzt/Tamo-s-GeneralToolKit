import { Component } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    StatusBar.hide();
    ScreenOrientation.lock({
      orientation: 'landscape',
    });
  }
}
