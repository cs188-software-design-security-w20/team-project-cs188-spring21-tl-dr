import * as React from "react";
import axios from "axios"
import Home from "./home";
import Auth from "./auth";
import Profile from "./profile";
import Global from "./global";
import { Router } from "@reach/router";
import { RouteComponentProps } from '@reach/router';
import { SERVER_URL } from "../constants";

import "@fontsource/rhodium-libre";
import "@fontsource/open-sans";
import Landing from "./landing";

export interface ISignupPageProps extends RouteComponentProps {
  path: string;
}

const IndexPage = () => {
  React.useEffect(() => {
    const getCsrfToken = async () => {
      const csrfEndpoint = `${SERVER_URL}/csrf-token`;
      const { data } = await axios.get(csrfEndpoint, {withCredentials: true});
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
      axios.defaults.withCredentials = true; // pass _csrf cookie with each request
    };
    getCsrfToken();
  }, []);

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
