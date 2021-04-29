import * as React from "react";
import { Link } from "gatsby";

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
    zIndex: 2
};

const button: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: 15,
    marginLeft: 5,
    fontFamily: "Open Sans",
    fontSize: 18,
    zIndex: 2,
    color: "black",
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    float: 'right',
    marginRight: 10,
    marginTop: '1%',
    cursor: 'pointer'
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
    const user:string = "User";
    const imgURL: string= 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    return (
        <div style={topbar}>
            <div className="flex" style={{display: "flex-row"}}>
                <div style={{fontFamily:"Rhodium Libre", fontSize: 36, marginLeft: 10, float: "left", cursor: "pointer"}}>
                    <Link to="/" style={{textDecoration: "none", color: "white"}}>TL;DR Websites</Link>
                    </div>
                <div style={button}>
                    <Link to="/auth" style={{textDecoration:'none'}}> Log Out</Link>
                    </div>
                <div style={{float: 'right', marginRight: '2%', marginTop: '0.25%', cursor: 'pointer'}}>
                    <Link to="/profile"><img src={imgURL} style={profPic}/></Link>
                </div>
                <div style={{float: 'right', marginRight: '2%', marginTop: '1.25%', fontFamily: "Open Sans"}}>Hi, {user}!</div>
            </div>
        </div>
    );
};

export default TopBar;