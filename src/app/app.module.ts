import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/home/map/map.component";
import { AboutComponent } from "./components/home/about/about.component";
import { PressComponent } from "./components/home/press/press.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    MapComponent,
    AboutComponent,
    PressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
