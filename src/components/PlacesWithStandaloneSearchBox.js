import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs
} from "react-google-maps";
import {Input} from "reactstrap";

const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, width:`300px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <Input
        className="form-control"
        type="text"
        placeholder="Enter a location here"
        style={{
          textOverflow: `ellipses`,
          width: '600px'
        }}
      />
    </StandaloneSearchBox>
      {props.places.map(
        (
        { place_id, name, formatted_address}
        ) =>
        <Input key={place_id} type="hidden" id="location" value={`${name}, ${formatted_address}`} onChange={props.liftMyLocationUp(`${name}`)}/>)}
    </div>
);

export default PlacesWithStandaloneSearchBox;