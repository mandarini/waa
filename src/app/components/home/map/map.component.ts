import { Component, OnInit } from "@angular/core";
import { ArtistsService } from "src/app/services/artists.service";
import { Artist } from "src/app/objects/artist";
import { ArtistDetails } from "src/app/objects/artist-details";
import { Space } from "src/app/objects/space";

@Component({
  selector: "waa-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  artists: Array<Artist>;
  artist: ArtistDetails;
  spaces: Array<Space>;
  constructor(private artistsService: ArtistsService) {
    this.artist = new ArtistDetails();
    artistsService.getArtists().subscribe(art => {
      console.log(art);
      this.artists = art;
    });
    artistsService.getSpaces().subscribe(spc => {
      console.log(spc);
      this.spaces = spc;
    });
  }

  ngOnInit() {}

  getDetails(uid: string) {
    this.artistsService.getArtistDetails(uid).subscribe(det => {
      console.log(det[0]);
      this.artist = det[0];
    });
  }
}
