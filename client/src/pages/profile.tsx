import axios from "axios";
import { Link } from "gatsby";
import * as React from "react";
import { ISignupPageProps } from "./index";
import { SERVER_URL } from "../constants";
import TopBar from "./topbar";

const userPic: React.CSSProperties = {
  padding: 20,
  height: 200,
  backgroundSize: "cover",
  display: "block",
  borderRadius: 200,

  WebkitBorderRadius: 200,
  MozBorderRadius: 200,
};

const usernameField: React.CSSProperties = {
  fontSize: "16px",
  border: "1px solid white",
  backgroundColor: "black",
  color: "white",
  display: "flex",
  borderRadius: "30px",
  padding: "12px",
  margin: "0px 0px 20px 0px",
  width: 400,
  outline: "none",
  cursor: "default",
};

const textField: React.CSSProperties = {
  fontSize: "16px",
  border: "1px solid white",
  backgroundColor: "#C4C4C4",
  display: "flex",
  borderRadius: "30px",
  padding: "12px",
  margin: "0px 0px 20px 0px",
  width: 400,
  outline: "none",
  cursor: "pointer",
};

const editButton: React.CSSProperties = {
  backgroundColor: "black",
  borderRadius: 15,
  fontFamily: "Open Sans",
  fontSize: 18,
  zIndex: 2,
  color: "white",
  height: 30,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  marginTop: "2%",
  width: 50,
  textAlign: "center",
  cursor: "pointer",
  marginLeft: "47%",
};

const saveButton: React.CSSProperties = {
  backgroundColor: "black",
  borderRadius: 15,
  fontFamily: "Open Sans",
  fontSize: 18,
  zIndex: 2,
  color: "white",
  height: 30,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  marginTop: "2%",
  width: 50,
  textAlign: "center",
  cursor: "pointer",
  marginLeft: "2%",
};

const button: React.CSSProperties = {
  backgroundColor: "#C4C4C4",
  borderRadius: 15,
  fontFamily: "Open Sans",
  fontSize: 18,
  zIndex: 2,
  color: "white",
  height: 30,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  marginTop: "2%",
  width: 75,
  textAlign: "center",
  cursor: "pointer",
  marginLeft: "40%",
};

interface Summary {
  plaintext?: String;
  url?: String;
  summarizedText: String;
}

class Profile extends React.Component<
  ISignupPageProps,
  {
    username: string;
    imgURL: string;
    email: string;
    isEditing: boolean;
    saved: Summary[];
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('userInfo'),
      imgURL: sessionStorage.getItem('imgUrl'),
      email: sessionStorage.getItem('email'),
      isEditing: false,
      saved: [
        { plaintext: "test1", summarizedText: "test" },
        { plaintext: "test2", summarizedText: "test2" },
      ],
    };
  }
  getUserSummaries = async () => {
    const userSummaryEndpoint = `${SERVER_URL}/user/summaries`;
    const res = await axios.get(userSummaryEndpoint, { withCredentials: true });
    this.setState({
      saved: res.data.summaries.map((s) => {
        return {
          plaintext: s.plaintext,
          summarizedText: s.summarizedText,
          url: s.url,
        };
      }),
    });
    console.log(res);
    return res;
  };
  componentDidMount() {
    this.getUserSummaries();
    setInterval(() => this.getUserSummaries(), 5000);
  }
  render() {
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
          User Info
        </div>
        <hr style={{ width: 100 }} />
        <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <div style={{ marginLeft: "25%" }}>
            <img src={this.state.imgURL} style={userPic} />
            <div
              style={{
                textAlign: "center",
                fontFamily: "Rhodium Libre",
                fontSize: 24,
              }}
            >
              {this.state.username}
            </div>
          </div>
          <div style={{ paddingLeft: 50, paddingTop: 25 }}>
            <div style={{ paddingLeft: 5, fontFamily: "Rhodium Libre" }}>
              username
            </div>
            <input
              type="text"
              style={usernameField}
              readOnly={true}
              value={this.state.username}
            />
            <div style={{ paddingLeft: 5, fontFamily: "Rhodium Libre" }}>
              email
            </div>
            <input
              type="text"
              style={this.state.isEditing ? textField : usernameField}
              readOnly={this.state.isEditing ? false : true}
              value={this.state.email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Rhodium Libre",
            fontSize: 36,
            marginTop: 75,
          }}
        >
          Saved
        </div>
        <hr style={{ width: 100 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.saved.map((search) => {
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
                plaintext:{search.plaintext}
                <br></br>
                <br></br>
                SummarizedText:{search.summarizedText}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
