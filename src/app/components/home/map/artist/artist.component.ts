import { Component, OnInit, Input } from "@angular/core";
import { ArtistDetails } from "src/app/objects/artist-details";

@Component({
  selector: "waa-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit {
  @Input() artist: ArtistDetails;

  constructor() {}

  ngOnInit() {
    console.log(this.artist);
  }

  enlarge(src: string) {
    
  }
}
