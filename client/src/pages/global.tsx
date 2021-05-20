/*
    Just displays ALL user summaries ever requested? (in summarized form)
*/
import date from "date-and-time";
import axios from "axios";
import * as React from "react";
import { SERVER_URL } from "../constants";
import { ISignupPageProps } from "./index";
import TopBar from "./topbar";

interface Summary {
  plaintext?: String;
  url?: String;
  summarizedText: String;
  name: String;
  pic: String;
  time: String;
}
const profPic: React.CSSProperties = {
  padding: 2,
  height: 45,
  backgroundSize: "cover",
  display: "block",
  borderRadius: 100,

  WebkitBorderRadius: 100,
  MozBorderRadius: 100,
};
class Global extends React.Component<
  ISignupPageProps,
  { summaries: Summary[] }
> {
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
        let created = date.parse(s.summary.createdAt, "YYYY-MM-DD[T]hh:mm...");
        console.log(s.summary.createdAt);
        return {
          plaintext: s.summary.plaintext,
          summarizedText: s.summary.summarizedText,
          time: date.format(created, "hh:mm A, MMM DD YYYY"),
          url: s.summary.url,
          name: (s.user[0].firstName ?? "") + (s.user[0].lastname ?? ""),
          pic: s.user[0].image,
        };
      }),
    });
  };
  componentDidMount() {
    this.getUserSummaries();
    // setInterval(() => this.getUserSummaries(), 50000);
  }

  render() {
    // REPLACE WITH ALL SUMMARIES FROM DB
    const summaries: string[] = ["test1", "test2"];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TopBar />
        <div
          style={{
            textAlign: "center",
            fontFamily: "Rhodium Libre",
            fontSize: 36,
            marginTop: 100,
          }}
        >
          See what others are summarizing 👀
        </div>
        {this.state.summaries.map((s, ind) => {
          return (
            <div
              style={{
                width: "50%",
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 10,
                border: "solid",
                borderColor: "#CCC",
                borderWidth: "0.5px",
                minHeight: 50,
                backgroundColor: "#FFF",
                color: "black",
                padding: 30,
                fontFamily: "Open Sans",
                boxShadow: "4px 4px 20px #DDD",
              }}
              key={ind}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={String(s.pic)} style={profPic} />
                <div
                  style={{
                    padding: "0 10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {s.name ?? "Anonymous"}
                  </div>
                  <div style={{ color: "#999" }}>{s.time} </div>
                </div>
              </div>
              <hr />
              {s.url ? (
                <span style={{ fontWeight: 800 }}>
                  Summarized from{" "}
                  <a
                    style={{ textDecoration: "none" }}
                    target="blank"
                    href={String(s.url)}
                  >
                    {" "}
                    here{" "}
                  </a>{" "}
                  :
                  <br />
                </span>
              ) : (
                <span style={{ fontWeight: 800 }}>
                  {s.url ? `Summarized from ${s.url}:` : "Summarized: "}
                  <br />
                </span>
              )}
              {s.summarizedText}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Global;
