// import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";

// const RouteTracker = ({ setPrevPath }) => {
//   const location = useLocation();
//   const prevLocationRef = useRef(null);

//   useEffect(() => {
//     // On mount, set previous location
//     if (prevLocationRef.current !== location.pathname) {
//       setPrevPath(prevLocationRef.current); // send previous to parent
//       prevLocationRef.current = location.pathname; // update current
//     }
//   }, [location]);

//   return null; // this component only tracks, renders nothing
// };

// export default RouteTracker;
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = ({ setPrevPath }) => {
  const location = useLocation();
  const prevLocationRef = useRef(null);

  useEffect(() => {
    if (prevLocationRef.current !== location.pathname) {
      console.log("Previous Path:", prevLocationRef.current);
      console.log("Current Path:", location.pathname);

      setPrevPath(prevLocationRef.current);
      prevLocationRef.current = location.pathname;
    }
  }, [location]);

  return null;
};

export default RouteTracker;
