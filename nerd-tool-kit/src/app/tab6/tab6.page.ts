import { Component } from '@angular/core';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
})
export class Tab6Page {
  projectArray: any = ['Contacts list', 'Text adventure game'];
  languageArray: any = [
    'C#',
    'C++',
    'Java',
    'JavaScript',
    'TypeScript',
    'Python',
    'Lua',
  ];
  storageArray: any = ['JSON', 'MySQL', 'NoSQL', 'SQLite'];

  usedChallenges: any = [];

  project: string = 'project';
  language: string = 'language';
  storage: string = '';
  fullMessage: string = 'Make a project, in language.';

  constructor() {}

  roll() {
    let projectIndex = Math.floor(Math.random() * this.projectArray.length);
    let languageIndex = Math.floor(Math.random() * this.languageArray.length);
    let storageIndex = Math.floor(Math.random() * this.storageArray.length);
    let useStorage = Math.floor(Math.random() * 4);

    this.project = this.projectArray[projectIndex];
    this.language = this.languageArray[languageIndex];
    if (useStorage == 0) {
      this.storage = `Use ${this.storageArray[storageIndex]} for datastorage`;
    } else {
      this.storage = '';
    }

    this.fullMessage = `Make a ${this.project}, in ${this.language}. ${this.storage}`;

    let messageWithTimeStamp = {
      Message: this.fullMessage,
      TimeStamp: new Date().getTime(),
    };
    this.usedChallenges.push(messageWithTimeStamp);
  }
}
