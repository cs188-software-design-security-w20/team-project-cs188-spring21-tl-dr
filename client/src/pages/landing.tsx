import * as React from "react";
import { Link } from "gatsby";
import {ISignupPageProps} from './index';

const signupButton: React.CSSProperties = {
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
    marginTop: '2%',
    width: 75,
    textAlign: 'center',
    cursor: 'pointer',
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
    marginTop: '2%',
    width: 75,
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft: 50,
    marginRight: 50
};

class Landing extends React.Component<ISignupPageProps> {
    render() {
        return (
            <div style={{textAlign: 'right'}}>
                <div style ={{fontSize:100, fontFamily: "Rhodium Libre", marginTop: "30%", marginRight: 50}}>
                    TL;DR Websites
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <div style={signupButton}>
                        <Link to ="/auth?signup=true" style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
                    </div>
                    <div style={loginButton}>
                        <Link to="/auth?signup=false" style={{textDecoration: 'none', color: 'white'}}>Log In</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;