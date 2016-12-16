import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';

@Component({
  moduleId: module.id,
  selector: 'egghead',
  templateUrl: 'egghead.component.html'
})
export class EggheadComponent implements OnInit {
  public title: string = 'Egghead.io';
  public url: string = 'http://bit.ly/2gQ5q09';
  constructor(private params: ModalDialogParams) {

    if (params.context.isCourse) {
      this.title = 'NativeScript for Angular';
      this.url = 'https://egghead.io/courses/create-native-apps-with-angular-native';
    }
  }

  ngOnInit() { }

  public close() {
    this.params.closeCallback();
  }
}