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
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#212121"
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#212121"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#181818"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1b1b1b"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#2c2c2c"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8a8a8a"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#373737"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#3c3c3c"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#4e4e4e"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#3d3d3d"
              }
            ]
          }
        ]
      }}
    >
      {props.markers &&
        props.markers.map((marker, i) => {
          let iconUrl = props.id === i ? props.icon : props.fallbackIcon;
          iconUrl = iconUrl ? iconUrl : "";
          return (
            <Marker
              // icon={{ url: iconUrl }}
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.long }}
            >
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
