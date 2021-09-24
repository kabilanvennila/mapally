import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import "../App.css";


mapboxgl.accessToken = "pk.eyJ1Ijoia2FiaWxhbjAwNSIsImEiOiJja3R4dW1qNzMya3gyMm9ucXh2NWpudDVyIn0.PLRZ15rdZ3PRZ_LgKOPxUw";

// Add the geocoder to the map

const Mapp = () => {
  const mapContainerRef = useRef(null);


  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-104.9876, 39.7405],
      zoom: 12.5,
    });


    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    

    map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
      );
    
    const marker = new mapboxgl.Marker() // initialize a new marker
    .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
    .addTo(map);
        
    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapp;