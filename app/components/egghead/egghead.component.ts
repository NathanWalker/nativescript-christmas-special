import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { LoadingIndicator } from 'nativescript-loading-indicator';

@Component({
  moduleId: module.id,
  selector: 'egghead',
  templateUrl: 'egghead.component.html'
})
export class EggheadComponent implements OnInit {
  public title: string = 'Egghead.io';
  public url: string = 'http://bit.ly/2hUicZh';
  private _loader: any;

  constructor(private params: ModalDialogParams) {

    if (params.context.isCourse) {
      this.title = 'NativeScript for Angular';
      this.url = 'http://bit.ly/2gRnRl0';
    }

    this._loader = new LoadingIndicator();
    this._loader.show({ message: 'Loading awesomeness...' });
  }

  ngOnInit() { }

  public close() {
    this.params.closeCallback();
  }

  public ready() {
    this._loader.hide();
  }
}