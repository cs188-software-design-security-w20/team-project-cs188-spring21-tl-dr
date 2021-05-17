import * as React from "react";
import Home from "./home";
import Auth from "./auth";
import Profile from "./profile";
import Global from "./global";
import { Router } from "@reach/router";
import { RouteComponentProps } from '@reach/router';

import "@fontsource/rhodium-libre";
import "@fontsource/open-sans";
import Landing from "./landing";

export interface ISignupPageProps extends RouteComponentProps {
  path: string;
}

const IndexPage = () => {
  return (
    <Router>
      <Landing path="/" />
      <Home path="/home" />
      <Auth path="/auth" />
      <Profile path="/profile" />
      <Global path="/global" />
    </Router>
  );
};

export default IndexPage;
