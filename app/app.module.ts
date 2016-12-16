import { NativeScriptModule } from 'nativescript-angular';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EggheadComponent } from './components/egghead/egghead.component';

@NgModule({
    declarations: [AppComponent, EggheadComponent],
    entryComponents: [EggheadComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule]
})
export class AppModule { }

