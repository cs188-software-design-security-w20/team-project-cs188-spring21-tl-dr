import * as React from "react";
import { Link } from "gatsby";
import { GoogleLogout } from "react-google-login";
import logoutIcon from "../images/logout.png";
import globeIcon from "../images/globe.jpeg";
import { navigate } from "gatsby";

const topbar: React.CSSProperties = {
  height: 60,
  width: "100%",
  backgroundColor: "black",
  display: "block",
  position: "fixed",
  top: 0,
  left: 0,
  color: "white",

  marginLeft: 0,
  marginRight: 0,
  zIndex: 2,
};

const button: React.CSSProperties = {
  backgroundImage: `url(${logoutIcon})`,
  backgroundSize: "cover",
  fontFamily: "Open Sans",
  width: 15,
  fontSize: 18,
  zIndex: 2,
  color: "black",
  height: 30,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 5,
  float: "right",
  marginRight: 30,
  marginTop: 12,
  cursor: "pointer",
};

const profPic: React.CSSProperties = {
  padding: 2,
  height: 45,
  backgroundSize: "cover",
  display: "block",
  borderRadius: 100,

  WebkitBorderRadius: 100,
  MozBorderRadius: 100,
};

const TopBar = () => {
  const [user] = React.useState((typeof window !== 'undefined') ? sessionStorage.getItem("userInfo") : null);
  const [imgURL] = React.useState((typeof window !== 'undefined') ? sessionStorage.getItem("imgUrl"): null);
  return (
    <div style={topbar}>
      <div className="flex" style={{ display: "flex-row" }}>
        <div
          style={{
            fontFamily: "Rhodium Libre",
            fontSize: 36,
            marginTop: 3,
            marginLeft: 20,
            float: "left",
            cursor: "pointer",
          }}
        >
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            TL;DR Websites
          </Link>
        </div>
        <GoogleLogout
          clientId="944387746626-hvgrqhj7ua1vlqsv6u0scddv0ac2djq0.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => {
            navigate("/");
            sessionStorage.clear();
          }}
          render={(renderProps) => (
            <div style={button} onClick={renderProps.onClick} />
          )}
        />

        <div
          style={{
            float: "right",
            marginRight: "25px",
            marginTop: "0.25%",
            cursor: "pointer",
          }}
        >
          <Link to="/profile">
            <img
              src={
                imgURL ??
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              style={profPic}
            />
          </Link>
        </div>
        {/*<div
          style={{
            float: "right",
            marginRight: "10px",
            marginTop: "1.25%",
            fontFamily: "Open Sans",
          }}
        >
          Hi, {user}!
        </div>*/}
        <div
          style={{
            float: "right",
            marginRight: "25px",
            marginTop: "0.25%",
            fontFamily: "Open Sans",
            fontWeight: "bold",
          }}
        >
          <Link to="/global">
            <img style={profPic} src={globeIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
