import { Component } from '@angular/core';
import { sound, sounds } from '../../assets/sounds';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor() {}

  sounds = sounds;
  //   <button class="sound-item" id="sound1" (click)="playSound()">
  //   <img class="sound-thumbnail" src="{{sound.Image}}" />
  //   </button>
  playSound(data: string) {
    console.log(`Playing: ${data}`);
    let audio = new Audio();
    audio.src = data;
    audio.load();
    audio.play();
  }
}
