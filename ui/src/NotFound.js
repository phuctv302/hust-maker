import React from "react";
import {Link} from '@reach/router';

const NotFound = () => {
  return (
    <div>
      <h1>Sorry, page not found</h1>

      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;