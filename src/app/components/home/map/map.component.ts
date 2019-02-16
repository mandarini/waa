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
  space: Space;
  spaces: Array<Space>;
  details: Array<ArtistDetails>;

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
    artistsService.getArtDets().subscribe(dets => {
      console.log(dets);
      this.details = dets;
    });
  }

  ngOnInit() {}

  getDetails(uid: string, s_uid: string) {
    this.artist = this.details.find((art: ArtistDetails) => {
      return art.uuid === uid;
    });
    this.space = this.spaces.find((space: Space) => {
      return space.suid === s_uid;
    });
    console.log(this.artist, this.space);
  }
}
