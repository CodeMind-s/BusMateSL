import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import { get } from '@/helpers/api';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface Schedule {
  _id: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  date: Date;
  status: string;
}

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const TrackbusScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [userLocationIsOn, setUserLocationOn] = useState(false);
  const [leafletHTML, setLeafletHTML] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [destinationLocation, setDestinationLocation] = useState('Nugegoda');
  const [startLocation, setStartLocation] = useState('Kaduwela');
  const [searchResult, setSearchResult] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [inProgressSchedule, setInProgressSchedule] = useState<Schedule>();
  
  const fetchSchedules = async () => {
    try {
      const response = await get(
        `schedules/bus`
      );
      const responseData = response.data as Schedule[];
      const today = new Date();
      const updatedSchedules = responseData
        .map((schedule: any) => ({
          ...schedule,
          date: new Date(schedule.date), 
         
        }))
        .filter((schedule: Schedule) => isSameDay(new Date(schedule.date), today));
      setSchedules(updatedSchedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
    const inProgressSch = schedules.find(schedule => schedule.status === "InProgress");
    if(inProgressSch){
      setInProgressSchedule(inProgressSch);
    }
    else{
      setUserLocationOn(false);
    }
  }, [schedules])

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      } catch (error) {
        setErrorMsg(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
      }
    };

    const intervalId = setInterval(getLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const searchHandler = async () => {
    setSearchResult(`
      let routingControl;

      const updateRoute = (startLatLng, destinationLatLng) => {
        if (routingControl) {
          mymap.removeControl(routingControl);
        }

        routingControl = L.Routing.control({
          waypoints: [
            L.latLng(startLatLng[0], startLatLng[1]),
            L.latLng(destinationLatLng[0], destinationLatLng[1])
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [
              { color: '#152bf4', opacity: 1, weight: 8 },
              { color: '#3B6DE7', opacity: 1, weight: 4 }
           ],
          },
          show: false,
          createMarker: () => null
        }).addTo(mymap);
      };

      const geocodeLocation = (location) => {
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
      };

      const fetchAndDisplayRoute = async () => {
        const startLatLng = [${location?.latitude}, ${location?.longitude}];
        const destinationLatLng = await geocodeLocation("${inProgressSchedule?.endLocation}");
       
        L.marker(destinationLatLng, { icon: redIcon }).addTo(mymap).bindPopup('${inProgressSchedule?.endLocation}');
        mymap.setView(destinationLatLng, 12);

        if (startLatLng && destinationLatLng) {
          updateRoute(startLatLng, [destinationLatLng.lat, destinationLatLng.lng]);
        } else {
          console.log('Could not get coordinates for routing.');
        }
      };

      fetchAndDisplayRoute();
    `);
  };

  useEffect(() => {
    if (location) {
      searchHandler();
    }
  }, [location]);

  useEffect(() => {
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
              .dot {
                position: relative;
                width: 12px;
                height: 12px;
                background-color: #3B6DE7;
                border-radius: 50%;
                border: 2px solid #FFFFFF;
              }
              .dotinner {
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
              const mymap = L.map('map', {
                center: [${location?.latitude || 6.934101}, ${location?.longitude || 79.859634}], 
                zoom: 12,
                zoomControl: false
              });
              
              const userLocationIcon = L.divIcon({
                  className: 'custom-icon',
                  iconSize: [41, 41],
                  html: \`<div class=" dot "><div class="dotinner"></div></div>\`
              });

              const redIcon = L.icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });

              L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 19,
                  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              }).addTo(mymap);

              if(${userLocationIsOn}){
                const userLocation = [${location?.latitude}, ${location?.longitude}];
                L.marker(userLocation, { icon: userLocationIcon }).addTo(mymap).bindPopup('Your Location');
                mymap.setView(userLocation, 12);

                if("${inProgressSchedule?.endLocation}") {
                  ${searchResult}
                }
              }
            </script>
        </body>
      </html>
    `;

    setLeafletHTML(mapHTML);
  }, [location, searchResult, userLocationIsOn]);

  return (
    <View className=' h-full relative'>
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        style={{ flex: 1 }}
      />
      <TouchableOpacity onPress={() => setUserLocationOn(!userLocationIsOn)} className={`absolute top-3 rounded-xl w-[90%] ${userLocationIsOn ? ' bg-green-600' : ' bg-red-600'} left-[5%] py-3 px-5 flex flex-row justify-between items-center`}>
        <Text className='text-xl text-white font-semibold text-center'>{userLocationIsOn ? "Location Service is On" : "Location Service is Off"}</Text>
        <Fontisto name={`${userLocationIsOn ? 'toggle-on' : 'toggle-off'}`} size={30} color="white" />
      </TouchableOpacity>

      {userLocationIsOn && (<View className='absolute bottom-3 rounded-xl w-[90%] bg-primary left-[5%] py-3 px-5 flex flex-row justify-between items-center'>
        <Text className='text-xl text-white font-semibold text-center'>{startLocation} - {destinationLocation} </Text>
        <FontAwesome6 name="route" size={24} color="white" />
      </View>)}
    </View>
  );
};

export default TrackbusScreen;
