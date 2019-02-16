import { Component, OnInit } from "@angular/core";
import { Artist } from "src/app/objects/artist";
import { ArtistsService } from "src/app/services/artists.service";
import { Space } from "src/app/objects/space";

@Component({
  selector: "waa-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  artists: Array<Artist>;
  spaces: Array<Space>;

  constructor(private artistsService: ArtistsService) {
    artistsService.getArtistsInit().subscribe(arts => {
      artistsService.setArtists(arts);
    });
    artistsService.getSpacesInit().subscribe(spaces => {
      artistsService.setSpaces(spaces);
    });
  }

  ngOnInit() {}
}
