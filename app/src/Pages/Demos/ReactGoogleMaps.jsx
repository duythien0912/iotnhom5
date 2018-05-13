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
    await axios
      .get("https://u3v20krp31.execute-api.us-east-1.amazonaws.com/dev/map")
      .then(data => {
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
      })
      .catch(error => {
        console.log(error);
      });
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
        defaultZoom={15}
        defaultCenter={data[0] ? data[0] : { lat: 10.850382, lng: 106.771153 }}
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
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfjjFTCSK1Es7PODiNV3recpxSBXNi4g&v=3.exp&libraries=geometry,drawing,places",
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
