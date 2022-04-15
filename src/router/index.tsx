import { useState, useEffect } from "react";
import { ErrorBoundary } from "components/ErrorBoundary";
import Counter from "src/pages/Counter";
import Home from "src/pages/Home";

export default function Router(): JSX.Element {
  const [route, setRoute] = useState(window.location.hash.substring(1));

  function routeChange() {
    setRoute(window.location.hash.substring(1));
  }

  useEffect(() => {
    window.addEventListener("hashchange", routeChange);

    return () => {
      window.removeEventListener("hashchange", routeChange);
    };
  });

  let Children: (props: unknown) => JSX.Element;

  switch (route) {
    case "/counter":
      Children = Counter;
      break;
    default:
      Children = Home;
  }

  return (
    <ErrorBoundary>
      <Children />
    </ErrorBoundary>
  );
}
