import * as React from "react";
import Home from "./home";
import Auth from "./auth";
import Profile from "./profile";
import { Router } from "@reach/router";
import { RouteComponentProps } from '@reach/router';

import "@fontsource/rhodium-libre";
import "@fontsource/open-sans";

export interface ISignupPageProps extends RouteComponentProps {
  path: string;
}

const IndexPage = () => {
  return (
    <Router>
      <Home path="/" />
      <Auth path="/auth" />
      <Profile path="/profile"/>
    </Router>
  );
};

export default IndexPage;
