import _ from "lodash";
import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
import axios from "axios";
import Header from "../../Header";
import pinRed from "../../image/pinRed.svg";

class Map extends Component {
  state = {
    pathCoordinates: [],
    data: []
  };

  componentDidMount = async () => {
await
     axios
      .get("YOUR_API_URL")
      .then(data => {
if(data.data !== this.state.pathCoordinates){
        this.setState({
          pathCoordinates: data.data
        });
        data.data.map(data => {
          this.setState({
            data: [
              ...this.state.data,
              { lat: parseFloat(data.lat), lng: parseFloat(data.lng) }
            ]
          });
          return true;
        });

}
      })
      .catch(error => {
        console.log(error);
      })
;
  };

  render() {
    const { data } = this.state;
    const market = data
      ? data.map((data, x) => (
          <Marker
            icon={{
              url: pinRed
            }}
            position={data}
            key={`pathCoordinates${x}`}
          />
        ))
      : {};
    return (
      <GoogleMap
        defaultZoom={19}
        defaultCenter={data[0] ? [...data].pop() : { lat: 10.850522, lng: 106.773553 }}
      >
        <Polyline
          path={data}
          options={{
            strokeColor: "#ACC95B",
            strokeOpacity: 1,
            strokeWeight: 2
          }}
        />
        {market}
      </GoogleMap>
    );
  }
}

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAP_API&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `95vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => <Map />);

const enhance = _.identity;

const ReactGoogleMaps = () => [
  <Header key="header" />,
  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);
