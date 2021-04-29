import { Link } from "gatsby";
import * as React from "react";
import {ISignupPageProps} from './index';

const button: React.CSSProperties = {
    backgroundColor: "black",
    borderRadius: 15,
    fontFamily: "Open Sans",
    fontSize: 18,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    width: 50,
    textAlign: 'center',
    cursor: 'pointer',
};

class Auth extends React.Component<ISignupPageProps> {
    render()
    {
        return (
            <div>
                <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop: 150, fontFamily: "Rhodium Libre", color: "#C4C4C4", marginLeft: 400}}>TL;DR Websites</div>
                <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                    <div style={{boxShadow: "5px 5px 5px 5px #C4C4C4", width: 500, padding: "30px 50px 30px 50px", borderRadius: 25}}>
                        <div style={{fontFamily: "Rhodium Libre", fontSize: 36}}>Log In</div>
                        <input
                        type="text"
                        placeholder= "username"
                        style={{ fontSize: '16px',
                        border: '1px solid white',
                        backgroundColor: '#C4C4C4',
                        display: 'flex',
                        borderRadius: '30px',
                        padding: '12px',
                        margin: '20px 0px 20px 0px',
                        width: 400,
                        outline: 'none' }}
                        />
                        <input
                        type="text"
                        placeholder="password"
                        style={{ fontSize: '16px',
                        border: '1px solid white',
                        backgroundColor: '#C4C4C4',
                        display: 'flex',
                        borderRadius: '30px',
                        padding: '12px',
                        margin: '20px 0px 20px 0px',
                        width: 400,
                        outline: 'none' }}
                        />
                        <div style={{display: "flex", alignItems:"center", marginTop: 50}}>
                            <div style={{textDecoration: "underline", color: "black", marginRight: 180, cursor: "pointer", fontFamily: "Open Sans" }}>Don't Have an Account?</div>
                            <div style={button}><Link to="/" style={{textDecoration: "none", color: "white"}}>Enter</Link></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Auth;