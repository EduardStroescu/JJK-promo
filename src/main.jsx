import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import { Home } from "./pages";
import { Layout } from "./components";
import { StickyProvider } from "./components/StickyCursor/StickyContext";
import { Scroll } from "./components/Scroll";
import { Story } from "./pages/story/Story";
import { Characters } from "./pages/characters/Characters";

const rootRoute = new RootRoute({
  component: () => {
    return (
      <StickyProvider>
        <Scroll>
          <Layout>
            <Outlet />
            {/* <TanStackRouterDevtools position="bottom-right" /> */}
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
  storyRoute,
  charactersRoute,
]);

const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: {},
});

const rootElement = document.getElementById("app");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<RouterProvider router={router} />);
}
