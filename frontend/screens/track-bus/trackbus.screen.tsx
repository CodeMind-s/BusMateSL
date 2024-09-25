import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Linking, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SearchContext } from '../../contexts/SearchContext';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface SosModalProps {
  setIsSosOn: (isOn: boolean) => void;
}

const TrackbusScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [userLocationIsOn, setUserLocationOn] = useState(false);
  const [markersScript, setMarkersScript] = useState('');
  const [leafletHTML, setLeafletHTML] = useState('');
  const { isSearchActive, setIsSearchActive } = useContext(SearchContext);
  const [isSosOn, setIsSosOn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isBusClick, setIsBusClick] = useState(false);
  const [startLocation, SetStartLocation] = useState('');
  const [destinationLocation, SetDestinationLocation] = useState('');
  const [isSearchResultActive, SetIsSearchResultActive] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  

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

  // const clickHandler = () =>{
  //   setIsBusClick(!isBusClick);
  // }   

  const searchHandler = () =>{
    setUserLocationOn(false);
    SetIsSearchResultActive(true);
    setSearchResult(`
      let routingControl;

      const updateRoute = (startLatLng, destinationLatLng) => {
        if (routingControl) {
          mymap.removeControl(routingControl);
        }

        routingControl = L.Routing.control({
          waypoints: [
            startLatLng,
            destinationLatLng
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [
              { color: '#152bf4', opacity: 1, weight: 8 },
              { color: '#3B6DE7', opacity: 1, weight: 4 }
           ],
          },
          show: false,
          formatter: new L.Routing.Formatter({
            language: "en",
            units: "metric",
            roundingSensitivity: 1,
            formatInstruction: function () {
              return "";
            }, 
          }),
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
        const startLatLng = await geocodeLocation("${startLocation}");
        const destinationLatLng = await geocodeLocation("${destinationLocation}");

        console.log(startLatLng, destinationLatLng);  // Corrected typo

        if (startLatLng && destinationLatLng) {
          updateRoute(startLatLng, destinationLatLng);
        } else {
          console.log('Could not get coordinates for routing.');
        }
      };

      fetchAndDisplayRoute();
    `);
    setIsSearchActive(false);
  }   

  // const mark=`
  //       const userLocation = [6.934101, 79.859634];
  //       const marker = L.marker(userLocation, { icon: userLocationIcon }).addTo(mymap).bindPopup('Your Location');
  //       mymap.setView(userLocation, 12);

  //      marker.on('click', function() {
  //       window.ReactNativeWebView.postMessage('markerClicked');
  //     });
  //     `

   

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

              if(${userLocationIsOn}){
                  const userLocation = [${location?.latitude}, ${location?.longitude}];
                  L.marker(userLocation, { icon: userLocationIcon }).addTo(mymap).bindPopup('Your Location');
                  mymap.setView(userLocation, 12);
              }

              if(${isSearchResultActive}){
                ${searchResult}
              }
 
            </script>
        </body>
      </html>
    `;

    setLeafletHTML((prevHTML) => (prevHTML !== mapHTML ? mapHTML : prevHTML));

  }, [location, userLocationIsOn, markersScript, searchResult, isSearchResultActive]);
  
  return (
    <View className=' h-full relative'>
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        style={{ flex: 1 }}
        // onMessage={(event) => {
        //   if (event.nativeEvent.data === 'markerClicked') {
        //     clickHandler(); // Call your click handler when the marker is clicked
        //   }
        // }}
      />
      {!isSearchResultActive && (
        <View className=' absolute bottom-3 right-2 flex justify-center items-center'>
          <TouchableOpacity onPress={markUserLocation} className=' bg-white flex-1 items-center justify-center h-[35px] w-[35px] rounded-full mb-4'>
            <Ionicons name="locate" size={28} color="#3B6DE7" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setIsSosOn(true)} className=' bg-red-600 flex-1 items-center justify-center h-[50px] w-[50px] rounded-full'>
            <Text className=' text-white font-bold text-lg'>SOS</Text>
          </TouchableOpacity>
        </View>
      )}

      {isSearchResultActive && (
        <TouchableOpacity onPress={()=>SetIsSearchResultActive(false)} className=' absolute top-12 right-2 flex justify-center items-center bg-swhite p-1 rounded-full shadow-xl shadow-black'>
          <Ionicons name="close-sharp" size={24} color="black" />
        </TouchableOpacity>
      )}

      {isSearchResultActive && (
        <View className=' w-full absolute bottom-4 left-0 flex justify-center items-center'>
          <TouchableOpacity className=' bg-primary h-16 w-11/12 rounded-lg flex flex-row justify-center items-center'>
            <Text className=' text-center font-bold text-white text-2xl mr-5'>{startLocation} - {destinationLocation}</Text>
            <FontAwesome6 name="route" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* search box */}
      {isSearchActive && (
        <View className='absolute -top-5 left-0 bg-Secondary pl-5 py-7 rounded-b-[20px] w-full'>
          <View className='  flex flex-row justify-between '>
            <View className=' w-[85%]'>
              <TextInput className=' bg-swhite mb-5 h-10 rounded-md placeholder:pl-3' onChangeText={(text) => SetStartLocation(text)} value={startLocation} placeholder='Enter start location'></TextInput>
              <TextInput className=' bg-swhite mb-5 h-10 rounded-md placeholder:pl-3' onChangeText={(text) => SetDestinationLocation(text)} value={destinationLocation} placeholder='Enter destination'></TextInput>
            </View>
            <TouchableOpacity className=' flex-1 justify-center items-center'>
            <Ionicons name="repeat" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>searchHandler()} className=' bg-primary w-[85%] rounded-md h-10 flex justify-center items-center'>
            <Text className=' font-bold text-white'>Search Route</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* sos box */}
      {isSosOn &&(
         <SosModal setIsSosOn={setIsSosOn}/>
      )}
      {isBusClick&& <Text>clicked</Text>}
    </View>
  )
}


const SosModal: React.FC<SosModalProps> = ({ setIsSosOn }) => {
  const handleCall = () => {
    const phoneNumber = '119';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View className=' absolute bottom-0 left-0 w-full p-6 rounded-t-3xl bg-swhite '>
          <TouchableOpacity onPressIn={()=>setIsSosOn(false)} className=' absolute -top-5 left-[48%]'>
            <Ionicons name="remove" size={70} color="#A6A6A6" />
          </TouchableOpacity>
          <Text className=' text-xl font-extrabold'>119 Assistance</Text>
          <Text className=' text-[#6d6d6d] mt-1'>When you call 119, you trip details will be shared with police.<Text className='text-primary'> Change sharing settings</Text></Text>
          <View className=' flex-1 flex-row mt-5'>
            <View className=' flex justify-center items-center'>
              <Ionicons name="location-outline" size={30} color="#3B6DE7" />
            </View>
            <View className='ml-5'>
              <Text className=' text-base font-bold'>Police station - Kalaniya</Text>
              <Text className=' text-xs text-[#A6A6A6]'>340 Biyagama Rd, Peliyagoda, Sri lanka</Text>
            </View>
          </View>
          <View className=' flex-1 flex-row mt-4'>
            <View className=' flex justify-center items-center'>
              <Ionicons name="call" size={28} color="red" />
            </View>
            <View className='ml-5'>
              <Text className=' text-base font-bold'>119</Text>
              <Text className=' text-xs text-[#A6A6A6]'>Sri Lanka Police</Text>
            </View>
          </View>
          <View className=' flex justify-center items-center mt-5'>
            <TouchableOpacity onPress={handleCall} className=' bg-primary flex flex-row w-3/5 h-[50px] rounded-xl items-center justify-center'>
              <Ionicons name="call" size={25} color="white" />
              <Text className=' text-base font-semibold text-white ml-2'>Call 119</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
};

export default TrackbusScreen