import { Component, OnInit } from "@angular/core";
import { ArtistsService } from "src/app/services/artists.service";
import { Artist } from "src/app/objects/artist";
import { ArtistDetails } from "src/app/objects/artist-details";

@Component({
  selector: "waa-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  artists: Array<Artist>;
  artist: ArtistDetails;
  constructor(private artistsService: ArtistsService) {
    this.artist = new ArtistDetails();
    artistsService.getArtists().subscribe(art => {
      console.log(art);
      this.artists = art;
    });
  }

  ngOnInit() {}

  getDetails(uid: string) {
    this.artistsService.getArtistDetails(uid).subscribe(det => {
      this.artist = det[0];
    });
  }
}
