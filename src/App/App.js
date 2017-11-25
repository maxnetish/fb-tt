/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

import React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import remove from 'lodash/remove';
import find from 'lodash/find';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} from 'react-google-maps';

const AppWrapper = styled.div``;

const PointsPaneBlock = styled.div`
  width: 32%;
  padding: 15px;
`;

const StyledTextInput = styled.input`
  font-size: 16px;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
`;

const MapPaneBlock = styled.div`
  height: 100vh;
  background: gray;
  position: fixed;
  top: 0;
  right: 0;
  left: calc(32% + 30px);
`;

const MapComponent = withScriptjs(
  withGoogleMap(props => {
    let polylinePath = props.points.map(p => ({ lat: p.lat, lng: p.lng }));
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        options={{ fullscreenControl: false }}
        ref={props.onMapMounted}
      >
        {props.points.map(p => (
          <Marker
            key={p.key}
            draggable={true}
            clickable={true}
            position={{ lat: p.lat, lng: p.lng }}
            onClick={e => props.onMarkerClick(p)}
          >
            {p.showInfoBox ? (
              <InfoWindow
                onCloseClick={e => props.onCloseInfoWindowClick(e, p)}
              >
                <div>{p.label}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        {polylinePath && polylinePath.length ? (
          <Polyline path={polylinePath} />
        ) : null}
      </GoogleMap>
    );
  }),
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
    };
  }

  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <AppWrapper>
        <PointsPaneBlock>
          <form onSubmit={e => this.onFormSubmit(e)}>
            <StyledTextInput
              type="text"
              innerRef={el => (this.inputNewPointRef = el)}
              required
              placeholder="Enter name of new point"
            />
          </form>
          <ul>
            {this.state.points.map(point => (
              <li key={point.key}>
                <span>{point.label}</span>
                <a href="" onClick={e => this.onRemovePointClick(e, point.key)}>
                  <i className="fa fa-minus-circle" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </PointsPaneBlock>
        <MapPaneBlock>
          <MapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTCV1_UPfbhh6QfQvnmn7aEWV8nEtZiME&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onMapMounted={el => (this.mapRef = el)}
            points={this.state.points}
            onMarkerClick={(e, point) => this.onMarkerClick(e, point)}
            onCloseInfoWindowClick={(e, point) =>
              this.onCloseInfoWindowClick(point)
            }
          />
        </MapPaneBlock>
      </AppWrapper>
    );
  }

  onFormSubmit(e) {
    e.preventDefault();

    let newPoints = this.state.points.slice();
    let latLng = this.mapRef.getCenter();
    newPoints.push({
      key: uniqueId('point_'),
      label: this.inputNewPointRef.value,
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
    this.setState({
      points: newPoints,
    });
    this.inputNewPointRef.value = null;
  }

  onRemovePointClick(e, pointKey) {
    e.preventDefault();

    let newPoints = this.state.points.slice();
    remove(newPoints, p => p.key === pointKey);
    this.setState({
      points: newPoints,
    });
  }

  onMarkerClick(point) {
    let newPoints = this.state.points.slice();
    let targetPoint = find(newPoints, p => p.key === point.key);
    targetPoint.showInfoBox = !targetPoint.showInfoBox;
    this.setState({
      points: newPoints,
    });
  }

  onCloseInfoWindowClick(point) {
    let newPoints = this.state.points.slice();
    let targetPoint = find(newPoints, p => p.key === point.key);
    targetPoint.showInfoBox = false;
    this.setState({
      points: newPoints,
    });
  }
}

export default App;
