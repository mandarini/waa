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
  fullArtistDetailsRef: AngularFireList<ArtistDetails>;
  artistsSubject: BehaviorSubject<Artist[]>;
  spacesSubject: BehaviorSubject<Space[]>;
  artDetSubject: BehaviorSubject<ArtistDetails[]>;

  constructor(private db: AngularFireDatabase) {
    this.artistsRef = db.list<Artist>("participants");
    this.spacesRef = db.list<Space>("spaces");
    this.fullArtistDetailsRef = db.list("/participantDetails");
    this.artistsSubject = new BehaviorSubject<Artist[]>(null);
    this.spacesSubject = new BehaviorSubject<Space[]>(null);
    this.artDetSubject = new BehaviorSubject<ArtistDetails[]>(null);
  }

  getArtistDetails(uid: string) {
    this.artistDetailsRef = this.db.list("/participantDetails", ref =>
      ref.orderByChild("uuid").equalTo(uid)
    );
    return this.artistDetailsRef.valueChanges();
  }

  getArtistsInit() {
    return this.artistsRef.valueChanges();
  }
  getAllDetailedArtists() {
    return this.fullArtistDetailsRef.valueChanges();
  }
  getSpacesInit() {
    return this.spacesRef.valueChanges();
  }

  setArtists(artists: Artist[]) {
    this.artistsSubject.next(artists);
  }

  setArtDetails(artdetails: ArtistDetails[]) {
    this.artDetSubject.next(artdetails);
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

  getArtDets() {
    return this.artDetSubject.asObservable();
  }
}
