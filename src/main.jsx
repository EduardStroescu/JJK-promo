import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import { Characters, Home, Story } from "./pages";
import { Layout } from "./components";
import { StickyProvider } from "./components/StickyCursor/StickyContext";
import { Scroll } from "./components/Scroll";

const rootRoute = new RootRoute({
  component: () => {
    return (
      <StickyProvider>
        <Scroll>
          <Layout>
            <Outlet />
          </Layout>
        </Scroll>
      </StickyProvider>
    );
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return <Home />;
  },
});

const catchAllRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/$",
  component: () => {
    return <Home />;
  },
});

const storyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/story",
  component: () => {
    return <Story />;
  },
});

const charactersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/characters",
  component: () => {
    return <Characters />;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  catchAllRoute,
  storyRoute,
  charactersRoute,
]);

const router = new Router({
  routeTree,
  defaultPreload: "intent",
});

const rootElement = document.getElementById("app");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<RouterProvider router={router} />);
}
