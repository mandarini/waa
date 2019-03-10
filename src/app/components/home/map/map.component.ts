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

const your_API_key = "AIzaSyDp8PZ_Vb-fLogz4wcSF7ltbUFB3qw0-7A";
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
      this.artists = art;
    });
    artistsService.getSpaces().subscribe(spc => {
      this.spaces = spc;
    });
    artistsService.getArtDets().subscribe(dets => {
      this.details = dets;
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (window["google"] && window["google"]["maps"]) {
      this.maps = window["google"]["maps"];
      this.firstLoad(this.maps);
    } else {
      this.load.loadScript(url, "gmap", () => {
        this.maps = window["google"]["maps"];
        this.firstLoad(this.maps);
      });
    }
  }

  firstLoad(maps: any): void {
    this.athens = new maps.LatLng(37.973695, 23.736935);
    this.map = new maps.Map(this.mapElm.nativeElement, {
      zoom: 10,
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
  }

  loadAllMarkers(map: google.maps.Map): void {
    this.artistsService.getSpaces().subscribe((spcs: Array<Space>) => {
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
    this.map.panTo(
      new this.maps.LatLng(
        this.space.location.geometry.coordinates[1],
        this.space.location.geometry.coordinates[0]
      )
    );
    this.map.setZoom(15);
    console.log(this.artist, this.space);
  }

  getSpace(space: Space) {
    this.map.panTo(
      new this.maps.LatLng(
        space.location.geometry.coordinates[1],
        space.location.geometry.coordinates[0]
      )
    );
    this.map.setZoom(15);
  }
}
