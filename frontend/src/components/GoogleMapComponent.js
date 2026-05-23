import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";

function GoogleMapComponent() {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",

    // Your Google Maps API Key
    googleMapsApiKey: "AIzaSyBrCwp1IQXYoIUDbhHaM6z5kI2CzaFiWn0",

    libraries: ["places"],
  });

  // Map Size
  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "20px",
  };

  // Andhra Pradesh Center
  const center = {
    lat: 15.9129,
    lng: 79.7400,
  };

  // Accident Hotspots
  const hotspots = [
    {
      lat: 16.5062,
      lng: 80.6480,
    },
    {
      lat: 17.6868,
      lng: 83.2185,
    },
    {
      lat: 14.4426,
      lng: 79.9865,
    },
  ];

  // Loading Screen
  if (!isLoaded) {

    return (

      <div className="text-white text-2xl">

        Loading Map...

      </div>
    );
  }

  return (

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
    >

      {
        hotspots.map((spot, index) => (

          <Marker
            key={index}
            position={spot}
          />
        ))
      }

    </GoogleMap>
  );
}

export default GoogleMapComponent;