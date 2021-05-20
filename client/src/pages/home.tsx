import * as React from "react";
import TopBar from "./topbar";
import { ISignupPageProps } from "./index";
const axios = require("axios");

const button: React.CSSProperties = {
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
  marginTop: "5%",
  width: 50,
  textAlign: "center",
  cursor: "pointer",
  marginLeft: "25%",
};

const textArea: React.CSSProperties = {
  fontSize: "16px",
  width: "500px",
  border: "5px solid #808080",
  backgroundColor: "#C4C4C4",
  outline: "none",
  borderRadius: "20px",
  padding: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
  margin: "5px",
  minWidth: "50%",
  maxWidth: "75%",
  minHeight: "200px",
};

const inputArea: React.CSSProperties = {
  fontSize: "36px",
  border: "5px solid #808080",
  backgroundColor: "#C4C4C4",
  display: "flex",
  borderRadius: "30px",
  padding: "5px",
  paddingLeft: "10px",
  paddingRight: "10px",
  margin: "5px",
  minHeight: "13px",
  minWidth: "50%",
  outline: "none",
};

const greyButton: React.CSSProperties = {
  backgroundColor: "#C4C4C4",
  color: "white",
  borderRadius: 15,
  fontFamily: "Open Sans",
  fontSize: 18,
  zIndex: 2,
  height: 30,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  marginTop: "5%",
  width: 50,
  textAlign: "center",
  cursor: "pointer",
  marginLeft: "225px",
};

const host = "http://localhost:3000"; //change to production server later
class Home extends React.Component<
  ISignupPageProps,
  {
    showInputField: boolean; // whether to show input view or summarized view
    input: string;
    summarized: string;
    isInputText: boolean; // whether to show URL or text area input
    makePublic: boolean; // whether to make a summary public
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      showInputField: true,
      input: "",
      summarized: "",
      isInputText: false,
      makePublic: false
    };
  }
  handleSummary = () => {
    console.log(this.state.input);

    if (this.state.input.trim() !== "") {
      if (!this.state.isInputText) {
        axios
          .post(
            host + "/summarize",
            {
              url: this.state.input,
              isPublic: this.state.makePublic
            },
            {
              withCredentials: true,
            }
          )
          .then((data) =>
            this.setState({
              summarized: data.data.summarizedText,
              showInputField: false,
            })
          );
      } else {
        axios
          .post(
            host + "/summarize",
            {
              plaintext: this.state.input,
              isPublic: this.state.makePublic
            },
            { withCredentials: true }
          )
          .then((data) => {
            console.log(data);
            this.setState({
              summarized: data.data.summarizedText,
              showInputField: false,
            });
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };
  render() {
    console.log(this.state.makePublic)
    return (
      <div>
        <TopBar />
        {this.state.showInputField /* show "Summarize Me" menu */ ? (
          <div>
            <div
              style={{
                marginLeft: "30%",
                marginRight: "auto",
                marginTop: "200px",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontFamily: "Rhodium Libre",
                  marginLeft: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Summarize Me:
                <input type="checkbox"
                  name="isPublic"
                  value="Public"
                  style={{ marginTop: "30px", marginLeft: "75px" }}
                  onClick={() => { this.setState({ makePublic: !this.state.makePublic }) }} />
                <div style={{ fontSize: "16px", marginTop: "25px" }}>Make Public?</div>
              </div>
              {this.state.isInputText ? (
                <textarea
                  style={textArea}
                  onChange={(e) => this.setState({ input: e.target.value })}
                  value={this.state.input}
                />
              ) : (
                <input
                  type="text"
                  style={inputArea}
                  onChange={(e) => this.setState({ input: e.target.value })}
                  value={this.state.input}
                />
              )}
              <div style={button} onClick={this.handleSummary}>
                Go!
              </div>
            </div>
            <div
              style={{
                fontFamily: "Rhodium Libre",
                color: "#C4C4C4",
                fontSize: 24,
                textAlign: "center",
                marginTop: 50,
              }}
            >
              Enter a website URL to summarize it!
              <div
                onClick={() => {
                  this.setState({ isInputText: !this.state.isInputText });
                }}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Or click here to enter a{" "}
                {this.state.isInputText ? "URL" : "chunk of text"}.
              </div>
            </div>
          </div>
        ) : (
          /* show results page */
          <div>
            <div
              style={{
                marginLeft: "30%",
                marginRight: "auto",
                marginTop: "200px",
              }}
            >
              <div style={{ fontSize: 36, fontFamily: "Rhodium Libre" }}>
                We shortened:
              </div>
              <div
                style={{
                  minWidth: 100,
                  marginRight: "40%",
                  borderRadius: 15,
                  minHeight: 50,
                  backgroundColor: "#C4C4C4",
                  color: "white",
                  padding: 10,
                  fontFamily: "Open Sans",
                  boxShadow: "2px 2px 2px 2px #6b6d70",
                }}
              >
                {this.state.input}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontFamily: "Rhodium Libre",
                  marginTop: 25,
                }}
              >
                Into...
              </div>
              <div
                style={{
                  minWidth: 100,
                  marginRight: "40%",
                  borderRadius: 15,
                  minHeight: 50,
                  backgroundColor: "#C4C4C4",
                  color: "white",
                  padding: 10,
                  fontFamily: "Open Sans",
                  boxShadow: "2px 2px 2px 2px #6b6d70",
                }}
              >
                {this.state.summarized}
              </div>
            </div>
            <div
              style={{ display: "flex", marginLeft: "22%" }}
              className="flex-row"
            >
              <div
                style={greyButton}
                onClick={() => {
                  this.setState({ showInputField: true });
                }}
              >
                Back
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
