import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Artist } from "../objects/artist";
import { Observable, BehaviorSubject } from "rxjs";
import { ArtistDetails } from "../objects/artist-details";
import { Space } from "../objects/space";

@Injectable({
  providedIn: "root"
})
export class ArtistsService {
  artistsRef: AngularFireList<Artist>;
  spacesRef: AngularFireList<Space>;
  artistDetailsRef: AngularFireList<ArtistDetails>;
  artistsSubject: BehaviorSubject<Artist[]>;
  spacesSubject: BehaviorSubject<Space[]>;

  // artists: Artist[];
  // spaces: Space[];

  constructor(private db: AngularFireDatabase) {
    this.artistsRef = db.list<Artist>("participants");
    this.spacesRef = db.list<Space>("spaces");
    this.artistsSubject = new BehaviorSubject<Artist[]>(null);
    this.spacesSubject = new BehaviorSubject<Space[]>(null);
  }

  getArtistsInit() {
    return this.artistsRef.valueChanges();
  }

  getArtistDetails(uid: string) {
    this.artistDetailsRef = this.db.list("/participantDetails", ref =>
      ref.orderByChild("uuid").equalTo(uid)
    );
    return this.artistDetailsRef.valueChanges();
  }

  getSpacesInit() {
    return this.spacesRef.valueChanges();
  }

  setArtists(artists: Artist[]) {
    this.artistsSubject.next(artists);
  }

  setSpaces(spaces: Space[]) {
    this.spacesSubject.next(spaces);
  }

  getArtists() {
    return this.artistsSubject.asObservable();
  }

  getSpaces() {
    return this.spacesSubject.asObservable();
  }
}
