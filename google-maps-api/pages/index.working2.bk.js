import Head from "next/head";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Script from "react-load-script";

export default function Home() {
  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  let map, infoWindow;

  function initMap() {
    const locator = this;
    let locations = [
      {
        title: "Costa Rica",
        address1: "Costa Rica",
        coords: { lat: 9.920592734850564, lng: -84.08576442578125 },
        placeId: "ChIJJcmsIWLlko8RK5qBNSX3VGI",
      },
    ];
    let mapOptions = {
      center: { lat: 38.0, lng: -100.0 },
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 4,
      zoomControl: true,
      maxZoom: 17,
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // infoWindow = new google.maps.InfoWindow();

    const marker = new google.maps.Marker({
      position: location.coords,
      map: locator.map,
      title: location.title,
    });

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }


  return (
    <>
      {/* <TextField inputRef={(ref) => (fieldRef = ref)} /> */}
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCm7BRUBs8nlIb3AvzVRcuOALEDnngcrgA&libraries=places,geometry&channel=GMPSB_locatorplus_v4_cABCDE"
        onLoad={initMap}
      />
      <div id="map-container">
        <div id="locations-panel">
          <div id="locations-panel-list">
            <header>
              <h1 className="search-title">
                <img src="https://fonts.gstatic.com/s/i/googlematerialicons/place/v15/24px.svg" />
                Find a location near you
              </h1>
              <div className="search-input">
                <input id="location-search-input" placeholder="Enter your address or zip code" />
                <div id="search-overlay-search" className="search-input-overlay search">
                  <button id="location-search-button">
                    <img className="icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/search/v11/24px.svg" alt="Search" />
                  </button>
                </div>
              </div>
            </header>
            <div className="section-name" id="location-results-section-name">
              All locations
            </div>
            <div className="results">
              <ul id="location-results-list"></ul>
            </div>
          </div>
          <div id="locations-panel-details"></div>
        </div>
        <div id="map"></div>
      </div>
    </>
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    //     <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">

    //     </div>
    //   </main>

    //   <footer className="flex items-center justify-center w-full h-24 border-t">
    //     footer
    //   </footer>
    // </div>
  );
}
