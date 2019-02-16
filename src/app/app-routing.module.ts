import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/home/map/map.component";
import { AboutComponent } from "./components/home/about/about.component";
import { PressComponent } from "./components/home/press/press.component";

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomeComponent
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "map",
        pathMatch: "full"
      },
      {
        path: "map",
        component: MapComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "press",
        component: PressComponent
      }
    ]
  },
  { path: "", redirectTo: "/welcome", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
