import { useRouteError } from "react-router-dom";
import "./error-page.css"

interface errorType extends Error{
    statusText: string,
    message: string,
    status: number

}

export default function ErrorPage() {
  const error = useRouteError() as errorType;

  return (
    <div id="error-page">
      <h1>Oops! <i>{error.status}</i></h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}