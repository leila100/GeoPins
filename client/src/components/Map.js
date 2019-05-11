import React, { useState } from "react";
import ReactMapGl, { NavigationControl } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 29.6197,
  longitude: -95.6349,
  zoom: 13
};

const Map = ({ classes }) => {
  const [viewPort, setViewPort] = useState(INITIAL_VIEWPORT);

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
