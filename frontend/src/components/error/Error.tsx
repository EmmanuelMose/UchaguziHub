import { Link, useRouteError, useLocation } from "react-router-dom";
import './Error.css';

const Error = () => {
  const error = useRouteError();
  const location = useLocation();

  return (
    <div className="error-page">
      <div className="error-box">
        <h1>Page not found</h1>

        <p>Sorry, we could not find the page you are looking for.</p>

        <p>
          <strong>Path:</strong> {location.pathname}
        </p>

        <p>{(error as Error)?.message || "An unexpected error occurred."}</p>

        <Link to="/">Go back to home</Link>
      </div>
    </div>
  );
};

export default Error;
