/*
    Just displays ALL user summaries ever requested? (in summarized form)
*/

import axios from "axios";
import * as React from "react";
import { SERVER_URL } from "../constants";
import { ISignupPageProps } from "./index";
import TopBar from "./topbar";

interface Summary {
  plaintext?: String;
  url?: String;
  summarizedText: String;
}
class Global extends React.Component<ISignupPageProps> {
  constructor(props) {
    super(props);
    this.state = {
      summaries: [],
    };
  }

  getUserSummaries = async () => {
    const userSummaryEndpoint = `${SERVER_URL}/feed`;
    const res = await axios.get(userSummaryEndpoint, { withCredentials: true });
    console.log(res);
    this.setState({
      summaries: res.data.map((s) => {
        return {
          plaintext: s.plaintext,
          summarizedText: s.summarizedText,
          url: s.url,
        };
      }),
    });
    return res;
  };
  componentDidMount() {
    this.getUserSummaries();
    setInterval(() => this.getUserSummaries(), 50000);
  }

  render() {
    // REPLACE WITH ALL SUMMARIES FROM DB
    const summaries: string[] = ["test1", "test2"];

    return (
      <div>
        <TopBar />
        <div
          style={{
            textAlign: "center",
            fontFamily: "Rhodium Libre",
            fontSize: 36,
            marginTop: 150,
          }}
        >
          See what others are summarizing 👀
        </div>
        {summaries.map((s) => {
          return (
            <div
              style={{
                width: 500,
                marginLeft: "31%",
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 15,
                minHeight: 50,
                backgroundColor: "#C4C4C4",
                color: "white",
                padding: 10,
                fontFamily: "Open Sans",
                boxShadow: "2px 2px 2px 2px #6b6d70",
              }}
            >
              <div style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
                User: koolkat238
                <hr />
                {s}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Global;
