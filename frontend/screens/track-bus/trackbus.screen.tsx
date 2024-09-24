import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface LocationCoords {
  latitude: number;
  longitude: number;
}

const TrackbusScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [userLocationIsOn, setUserLocationOn] = useState(false);
  const [markersScript, setMarkersScript] = useState('');
  const [leafletHTML, setLeafletHTML] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }catch (error) {
          setErrorMsg(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
        }
    };

    getLocation();    
  }, []);

  const markUserLocation = () => {
    setUserLocationOn(!userLocationIsOn);
    if(userLocationIsOn){
      setMarkersScript(`
        const userLocation = [${location?.latitude}, ${location?.longitude}];
        L.marker(userLocation, { icon: userLocationIcon }).addTo(mymap).bindPopup('Your Location');
        mymap.setView(userLocation, 12);
      `);
    }
    else{
      setMarkersScript(``);
    }
  }

  useEffect(() => {
    // if (!location) return;
    const mapHTML = `
      <!DOCTYPE html>
      <html>
        <head>
            <title>Leaflet Map with Geocoding</title>
            <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
            <style>
              body, html, #map { height: 100%; margin: 0; padding: 0; }
              .dot{
                  position: relative;
                  width: 12px;
                  height: 12px;
                  background-color: #3B6DE7;
                  border-radius: 50%;
                  border: 2px solid #FFFFFF;
              }
              .dotinner{
                  position: absolute;
                  top: -125%;
                  left: -125%;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  border: 15px solid #3b6ce72b;
              }
            </style>
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
            <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
            <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
        </head>
        <body>
            <div id="map"></div>
            <script>
              const mymap = L.map('map').setView([${location?.latitude || 6.934101}, ${location?.longitude || 79.859634}], 12);
              
              const userLocationIcon = L.divIcon({
                  className: 'custom-icon', // Use your custom class
                  iconSize: [41, 41], // Size of the icon
                  html: \`<div class=" dot ">
                            <div class="dotinner"></div>
                          </div>\`
              });

              L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              }).addTo(mymap);

              let routingControl;

              const r = (location) => {
                  g(location).then(latLng => {
                      if (latLng) {
                          if (routingControl) {
                              mymap.removeControl(routingControl);
                          }

                          routingControl = L.Routing.control({
                              waypoints: [
                                  L.latLng(6.747721, 80.501112), // Starting point
                                  latLng // Geocoded destination
                              ],
                              routeWhileDragging: true,
                              lineOptions: {
                                  styles: [{ color: '#3B6DE7', opacity: 0.8, weight: 5 }] // Blue route color
                              }
                          }).addTo(mymap);
                      } else {
                          console.log('Could not get coordinates for routing.');
                      }
                  });
              }

              const g = (location) => {
                  return new Promise((resolve) => {
                      L.Control.Geocoder.nominatim().geocode(location, function(results) {
                          if (results.length > 0) {
                              const latLng = results[0].center;
                              resolve(latLng);
                          } else {
                              console.log('No results found');
                              resolve(null);
                          }
                      });
                  });
              }

              ${markersScript}
            </script>
        </body>
      </html>
    `;

    setLeafletHTML((prevHTML) => (prevHTML !== mapHTML ? mapHTML : prevHTML));
  }, [location, userLocationIsOn, markersScript]);


  return (
    <View className=' h-full relative'>
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        style={{ flex: 1 }}
      />
      <View className=' absolute bottom-3 right-2 flex justify-center items-center'>
        <TouchableOpacity onPress={markUserLocation} className=' bg-white flex-1 items-center justify-center h-[35px] w-[35px] rounded-full mb-4'>
          <Ionicons name="locate" size={28} color="#3B6DE7" />
        </TouchableOpacity>
        <TouchableOpacity className=' bg-red-600 flex-1 items-center justify-center h-[50px] w-[50px] rounded-full'>
          <Text className=' text-white font-bold text-lg'>SOS</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default TrackbusScreen