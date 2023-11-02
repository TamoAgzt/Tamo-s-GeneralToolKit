import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  constructor() {}

  // D100 is D10 X 10 but 100 = 00

  //`You rolled a ${result}`

  //`It's heads!`
  //`It's tails!`
  selectedValue: string = '2';
  result: string = '0';
  roll(data = parseInt(this.selectedValue)) {
    if (data === 100) {
      const valuesToMap = [
        '00',
        '10',
        '20',
        '30',
        '40',
        '50',
        '60',
        '70',
        '80',
        '90',
      ];
      const randomIndex = Math.floor(Math.random() * valuesToMap.length);
      this.result = valuesToMap[randomIndex];
    } else if (data >= 2 && data <= 20) {
      let result = Math.floor(Math.random() * (data + 1));
      if (result === 0) {
        // Ensure the result is not zero
        this.roll();
      } else {
        // Update the result property
        this.result = result.toString();
      }
    }
  }
}
