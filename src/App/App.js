/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

import React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} from 'react-google-maps';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

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

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledPointListItem = styled.div`
  display: flex;
  margin: 5px 0;
  border: lightgray 1px solid;
  padding: 5px;
`;

const StyledDragHandle = styled.i.attrs({
  className: 'fa fa-bars',
  'aria-hidden': true,
  title: 'Drag to reorder',
})`
  cursor: move;
  margin-right: 5px;
`;

const StyledPointListItemLabel = styled.span`
  margin-right: 5px;
  flex-grow: 1;
`;

const DragHandle = SortableHandle(() => <StyledDragHandle />);

const SortableItem = SortableElement(
  ({ point, onRemovePointClick, indexOfItem }) => {
    return (
      <li>
        <StyledPointListItem>
          <DragHandle />
          <StyledPointListItemLabel>{point.label}</StyledPointListItemLabel>
          <a
            href=""
            title="Remove point"
            onClick={e => onRemovePointClick(e, indexOfItem)}
          >
            <i className="fa fa-minus-circle" aria-hidden="true" />
          </a>
        </StyledPointListItem>
      </li>
    );
  },
);

const SortableList = SortableContainer(({ points, onRemovePointClick }) => {
  return (
    <UnstyledList>
      {points.map((point, index) => (
        <SortableItem
          key={point.key}
          index={index}
          indexOfItem={index}
          point={point}
          onRemovePointClick={onRemovePointClick}
        />
      ))}
    </UnstyledList>
  );
});

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
            onDragEnd={e => props.onMarkerDragEnd(e, p)}
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
          <SortableList
            points={this.state.points}
            onSortEnd={({ oldIndex, newIndex }) =>
              this.onDragPointListItemEnd({
                oldIndex,
                newIndex,
              })
            }
            useDragHandle={true}
            onRemovePointClick={(e, index) => this.onRemovePointClick(e, index)}
          />
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
            onMarkerDragEnd={(e, point) => this.onMarkerDragEnd(e, point)}
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

  onRemovePointClick(e, index) {
    e.preventDefault();

    let newPoints = this.state.points.slice();
    newPoints.splice(index, 1);
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

  onMarkerDragEnd(e, point) {
    let newPoints = this.state.points.slice();
    let targetPoint = find(newPoints, p => p.key === point.key);
    targetPoint.lat = e.latLng.lat();
    targetPoint.lng = e.latLng.lng();
    this.setState({
      points: newPoints,
    });
  }

  onDragPointListItemEnd({ oldIndex, newIndex }) {
    this.setState({
      points: arrayMove(this.state.points, oldIndex, newIndex),
    });
  }
}

export default App;
