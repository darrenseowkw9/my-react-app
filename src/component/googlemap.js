import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";

function Googlemap({position, zoom}){
  let defaultPosition = {lat: 3.1473588980636906, lng: 101.69951373769794};
  let defaultZoom = 11;
  return(
    <APIProvider>
      <div style={{height: "100vh", width: "100%"}}>
        <Map defaultZoom={defaultZoom} defaultCenter={defaultPosition} minZoom={zoom} center={position}></Map>
        <Marker position={{lat: position? position.lat: defaultPosition.lat, lng: position? position.lng: defaultPosition.lng}} />
      </div>
    </APIProvider>
  );
};
export default Googlemap;