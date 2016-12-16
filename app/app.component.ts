import { Component, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { isIOS, screen } from 'platform';
import { topmost } from 'ui/frame';
import { Color } from 'color';
import { ModalDialogService, ModalDialogOptions, registerElement } from 'nativescript-angular';
import { SwipeGestureEventData } from "ui/gestures";
registerElement('Shimmer', () => require('nativescript-shimmer').Shimmer);
var ConfettiView = require('confetti').ConfettiView;
import * as enums from 'ui/enums';
import * as dialogs from 'ui/dialogs';

import { EggheadComponent } from './components/egghead/egghead.component';

declare var SAConfettiView: any, UIImage, ConfettiType, UILabel, CGRectMake, NSTextAlignmentCenter;

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  @ViewChild('shimmerView') shimmerView: any;
  public activeTree: any;
  public nextTree: any;
  public offerOn: boolean = false;
  public swipesLeft: string;
  public initShimmerLabel: boolean = false;

  private confettiView: any;
  private trees: any[] = [
    { src: '~/img/1.png', in: true, out: false },
    { src: '~/img/2.png', in: false, out: false },
    { src: '~/img/3.png', in: false, out: false },
    { src: '~/img/4.png', in: false, out: false },
    { src: '~/img/5.png', in: false, out: false },
    { src: '~/img/6.png', in: false, out: false },
    { src: '~/img/7.png', in: false, out: false },
    { src: '~/img/8.png', in: false, out: false }
  ];
  private cnt = 0;
  private nativeLabel: any;
  public total: number;

  constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef) {

    this.activeTree = this.trees[0];
    this.nextTree = this.trees[1];
    this.total = this.trees.length;
    this.swipesLeft = `${this.total} tree swipes to go!`;

    if (isIOS) {
      topmost().ios.controller.navigationBar.barStyle = 1;
      this.nativeLabel = new UILabel(CGRectMake(10, 30, 200, 60));
      this.nativeLabel.textColor = new Color('#555').ios;
      this.nativeLabel.textAlignment = NSTextAlignmentCenter;
      this.nativeLabel.text = 'Presents, Family, Toys, Presents, Family, Toys';
    }

  }

  public viewEgghead(isCourse?: boolean) {
    let options: ModalDialogOptions = {
      context: { isCourse },
      viewContainerRef: this.vcRef
    }
    this.modal.showModal(EggheadComponent, options);
  }

  public onSwipe(args: SwipeGestureEventData) {
    console.log(`Swipe Direction: ${args.direction}`);
    if (args.direction === 8) {
      // down, swap trees
      this.cnt++;
      if (this.cnt < this.trees.length) {
        if (this.cnt === 1) {
          this.activeTree.out = true;
          this.activeTree.in = false;
          this.nextTree.in = true;
          this.nextTree.out = false;
        } else if (this.cnt === 2) {
          this.activeTree = this.trees[2];
          this.activeTree.out = false;
          this.activeTree.in = true;
          this.nextTree.in = false;
          this.nextTree.out = true;
          // setTimeout(() => this.nextTree = this.trees[3], 1001);
        } else if (this.cnt === 3) {
          this.nextTree = this.trees[3]
          this.activeTree.out = true;
          this.activeTree.in = false;
          this.nextTree.in = true;
          this.nextTree.out = false;
          // setTimeout(() => this.activeTree = this.trees[4], 1001);
        } else if (this.cnt === 4) {
          this.activeTree = this.trees[4]
          this.activeTree.out = false;
          this.activeTree.in = true;
          this.nextTree.in = false;
          this.nextTree.out = true;
        } else if (this.cnt === 5) {
          this.nextTree = this.trees[5]
          this.activeTree.out = true;
          this.activeTree.in = false;
          this.nextTree.in = true;
          this.nextTree.out = false;
        } else if (this.cnt === 6) {
          this.activeTree = this.trees[6];
          this.activeTree.out = false;
          this.activeTree.in = true;
          this.nextTree.in = false;
          this.nextTree.out = true;
        } else if (this.cnt === 7) {
          this.nextTree = this.trees[7];
          this.activeTree.out = true;
          this.activeTree.in = false;
          this.nextTree.in = true;
          this.nextTree.out = false;
        }
      }
      if (this.total > 0) {
        this.total--;
        this.swipesLeft = `${this.total} tree swipes to go!`;

        if (this.total === 0) {
          // dialogs.alert('yo!');
          this.offerOn = true;
          if (isIOS) {
            this.confettiView = new ConfettiView();
            this.confettiView.colors([
              new Color('#A32C28').ios,
              new Color('#384030').ios,
              new Color('#7B8055').ios,
              new Color('#1C090B').ios,
              new Color('#fff').ios
            ]);
            this.confettiView.intensity(30.0);

            // this.confettiView.type = SAConfettiView.ConfettiType.image((<any>UIImage).tns_safeImageNamed(`~/img/santa.png`));
            this.confettiView.startConfetti();
          }
        }
      }
    }
  }

  ngOnInit() {
    this.initShimmerLabel = true;
  }

  ngAfterViewInit() {
    let shimmer = this.shimmerView.nativeElement;
    if (isIOS) {
      shimmer.ios.contentView = this.nativeLabel;
    }
  }

  public creatingView(e: any) {
    if (isIOS) {
      e.view = this.nativeLabel;
    }
  }
}
