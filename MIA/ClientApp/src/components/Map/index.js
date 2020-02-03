import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const LoadingElement = <div style={{ height: `100%` }} />;
const ContainerElement = () => <div className="map" />;

const MapElement = <div style={{ height: `100%` }} />;

const MapWithMarkers = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      options={{
        center: { lat: props.lat, lng: props.long },
        zoom: props.zoom,
        gestureHandling: "greedy"
      }}
    >
      {props.markers &&
        props.markers.map((marker, i) => {
          const iconUrl = props.id === i ? props.icon : props.fallbackIcon;
          return (
            <Marker icon={{ url: iconUrl }} key={marker.id} position={{ lat: marker.lat, lng: marker.long }}>
              {props.render && props.render !== undefined ? <InfoWindow>{props.render()}</InfoWindow> : null}
            </Marker>
          );
        })}
    </GoogleMap>
  );
});

export default class Map extends Component {
  render() {
    const protocol = "https";
    const googleApi = `${protocol}://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
    // console.log(googleApi);
    return (
      <MapWithMarkers
        lat={this.props.lat}
        long={this.props.long}
        zoom={this.props.zoom}
        markers={this.props.landMarks}
        icon={this.props.icon}
        fallbackIcon={this.props.fallbackIcon}
        googleMapURL={googleApi}
        loadingElement={LoadingElement}
        containerElement={ContainerElement()}
        mapElement={MapElement}
        {...this.props}
      />
    );
  }
}

Map.propTypes = {
  lat: PropTypes.number,
  long: PropTypes.number,
  zoom: PropTypes.number,
  icon: PropTypes.string,
  fallbackIcon: PropTypes.string,
  id: PropTypes.number,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      long: PropTypes.number,
      lat: PropTypes.number
    })
  )
};
