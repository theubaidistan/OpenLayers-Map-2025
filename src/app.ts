// Code goes here!
/*
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

//* declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //* Send This to Google's API!

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      //* console.log(response)
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 16,
        }
      );

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
*/

/*
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type NominatimResponse = {
  lat: string;
  lon: string;
}[];

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<NominatimResponse>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        enteredAddress
      )}`
    )
    .then((response) => {
      if (response.data.length === 0) {
        throw new Error("Could not fetch location!");
      }

      const coordinates = {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
      };

      document.getElementById("map")!.innerHTML = "";

      new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([coordinates.lng, coordinates.lat]),
          zoom: 16,
        }),
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
*/

import "./app.css";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";

import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

type NominatimResponse = {
  lat: string;
  lon: string;
}[];

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<NominatimResponse>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        enteredAddress
      )}`
    )
    .then((response) => {
      if (response.data.length === 0) {
        throw new Error("Could not fetch location!");
      }

      const coordinates = {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon),
      };

      document.getElementById("map")!.innerHTML = "";

      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([coordinates.lng, coordinates.lat]),
          zoom: 16,
        }),
      });

      // 🔹 Add marker feature
      const marker = new Feature({
        geometry: new Point(fromLonLat([coordinates.lng, coordinates.lat])),
      });

      // 🔹 Marker style (red pin icon, or you can use your own PNG)
      marker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scale: 1.2, // adjust size
          }),
        })
      );

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const markerLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(markerLayer);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
