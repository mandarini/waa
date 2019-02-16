/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ArtistsService } from "src/app/services/artists.service";
import { Artist } from "src/app/objects/artist";
import { ArtistDetails } from "src/app/objects/artist-details";
import { Space } from "src/app/objects/space";
import { ScriptLoadService } from "src/app/services/script-load.service";
import { InfoMap } from "src/app/objects/info-map";

const your_API_key = "AIzaSyBV4CbNglZMZTc9Qnh2iTTZvL8c0eVtHw0";
const url = `https://maps.googleapis.com/maps/api/js?key=${your_API_key}&libraries=geometry`;

@Component({
  selector: "waa-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, AfterViewInit {
  artists: Array<Artist>;
  artist: ArtistDetails;
  space: Space;
  spaces: Array<Space>;
  details: Array<ArtistDetails>;

  @ViewChild("mapElement") mapElm: ElementRef;
  maps: any;
  map: google.maps.Map;
  athens: google.maps.LatLng;
  infoWindow: google.maps.InfoWindow;

  constructor(
    private artistsService: ArtistsService,
    private load: ScriptLoadService
  ) {
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

  ngAfterViewInit() {
    this.load.loadScript(url, "gmap", () => {
      this.maps = window["google"]["maps"];
      this.athens = new this.maps.LatLng(32.06485, 34.763226);
      this.map = new this.maps.Map(this.mapElm.nativeElement, {
        zoom: 3,
        center: this.athens,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: this.maps.ZoomControlStyle.LARGE,
          position: this.maps.ControlPosition.RIGHT_BOTTOM
        }
      });
      this.loadAllMarkers(this.map);
    });
  }

  loadAllMarkers(map: google.maps.Map): void {
    this.artistsService.getSpaces().subscribe((spcs: Array<Space>) => {
      console.log(spcs);
      if (spcs) {
        spcs.forEach((space: Space) => {
          let markLatLng = new this.maps.LatLng(
            space.location.geometry.coordinates[1],
            space.location.geometry.coordinates[0]
          );
          let marker = new this.maps.Marker({
            position: markLatLng,
            title: space.address_en,
            map: map
          });
          this.infoWindow = new this.maps.InfoWindow();
          marker.addListener("click", () => {
            this.infoWindow.setContent(marker.getTitle());
            this.infoWindow.open(map, marker);
          });
        });
      }
    });
  }

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
