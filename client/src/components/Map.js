import React, { useState, useEffect } from "react";
import ReactMapGl, { NavigationControl, Marker } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from "./PinIcon";

const INITIAL_VIEWPORT = {
  latitude: 29.6197,
  longitude: -95.6349,
  zoom: 13
};

const Map = ({ classes }) => {
  const [viewPort, setViewPort] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewPort({ ...viewPort, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  return (
    <div className={classes.root}>
      <ReactMapGl
        width='100vw'
        height='calc(100vh - 64px)'
        mapStyle='mapbox://styles/mapbox/satellite-streets-v10'
        // could use for example mapStyle='mapbox://styles/mapbox/satellite-v9'
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={newViewPort => setViewPort(newViewPort)}
        {...viewPort}
      >
        {/* Navigation Control */}
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={newViewPort => setViewPort(newViewPort)} />
        </div>

        {/* Pin for the user's current location */}
        {userPosition && (
          <Marker latitude={userPosition.latitude} longitude={userPosition.longitude} offsetLeft={-19} offsetTop={-37}>
            <PinIcon size={40} color='red' />
          </Marker>
        )}
      </ReactMapGl>
    </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
