import * as React from "react";
import { Link } from "gatsby";
import { ISignupPageProps } from "./index";
import ReactTypingEffect from "react-typing-effect";
import GoogleLogin from "react-google-login";
import { navigate } from "gatsby";
import { signupOrLoginUser } from "../lib/fetch";

const signupButton: React.CSSProperties = {
  borderRadius: 10,
  fontFamily: "Open Sans",
  fontSize: 18,
  zIndex: 2,
  height: 32,
  color: "white",
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 8,
  marginTop: "2%",
  marginRight: "3%",
  width: 75,
  textAlign: "center",
  cursor: "pointer",
};

const loginButton: React.CSSProperties = {
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
  width: 75,
  textAlign: "center",
  cursor: "pointer",
  marginLeft: 50,
  marginRight: 50,
};

class Landing extends React.Component<ISignupPageProps, { hovered: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
  }
  handleLoginSuccess = async (googleUser) => {
    console.log(googleUser);
    console.log(googleUser.getAuthResponse().id_token);
    const res = await signupOrLoginUser(googleUser.getAuthResponse().id_token);
    navigate("/home/");
    console.log(res);
  };

  handleLoginFailure = async (error) => {
    console.log(error);
    // alert("login failed.");
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontFamily: "Rhodium Libre",
            marginTop: "30%",
            marginRight: 50,
          }}
        >
          <ReactTypingEffect text={["Too Long, Didn't Read", "TL;DR"]} />
          Websites
        </div>

        <GoogleLogin
          clientId="944387746626-hvgrqhj7ua1vlqsv6u0scddv0ac2djq0.apps.googleusercontent.com"
          render={(renderProps) => (
            <div
              onMouseEnter={() => {
                this.setState({ hovered: true });
              }}
              onMouseLeave={() => {
                this.setState({ hovered: false });
              }}
              onClick={renderProps.onClick}
              style={{
                ...signupButton,
                backgroundColor: this.state.hovered ? "#555" : "black",
              }}
            >
              Log in
            </div>
          )}
          onSuccess={this.handleLoginSuccess}
          onFailure={this.handleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
        {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <div style={loginButton}>
                        <Link to="/auth?signup=false" style={{textDecoration: 'none', color: 'white'}}>Log In</Link>
                    </div>
                </div> */}
      </div>
    );
  }
}

export default Landing;
