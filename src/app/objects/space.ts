export class Space {
  address_en: string;
  address_gr: string;
  location: {
    geometry: {
      coordinates: [number, number];
      type: string;
    };
    properties: {
      suid: string;
    };
    type: string;
  };
  suid: string;
}
