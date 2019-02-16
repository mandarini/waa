import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Artist } from "../objects/artist";
import { Observable } from "rxjs";
import { ArtistDetails } from "../objects/artist-details";

@Injectable({
  providedIn: "root"
})
export class ArtistsService {
  artistsRef: AngularFireList<Artist>;
  artistDetailsRef: AngularFireList<ArtistDetails>;
  artists: Observable<Artist[]>;
  artistOne: Observable<ArtistDetails>;

  constructor(private db: AngularFireDatabase) {
    this.artistsRef = db.list<Artist>("participants");
  }

  getArtists() {
    return this.artistsRef.valueChanges();
  }

  getArtistDetails(uid: string) {
    this.artistDetailsRef = this.db.list("/participantDetails", ref =>
      ref.orderByChild("uuid").equalTo(uid)
    );
    return this.artistDetailsRef.valueChanges();
  }
}
