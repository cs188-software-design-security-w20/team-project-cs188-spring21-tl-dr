import { Link } from "gatsby";
import * as React from "react";
import { ISignupPageProps } from './index';
import { GoogleLogin } from 'react-google-login';
import { signupOrLoginUser } from "../lib/fetch";

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

const parseURLParams = function (params?: string): string[] | null {
    if(params === undefined) return null;
    let input = params.split("?");
    input.shift();
    return input
}

class Auth extends React.Component<ISignupPageProps> {
    constructor(props) {
        super(props);
    }

    responseGoogle = async (googleUser) => {
        // console.log(googleUser);
        // console.log(googleUser.getAuthResponse().id_token);
        const res = await signupOrLoginUser(googleUser.getAuthResponse().id_token);
        if (res.ok) {
            //...redirect to main page
        } else {
            // throw some error or create an Alert?
        }
    }

    render()
    {
        console.log(this.props.location?.search)
        const params = parseURLParams(this.props.location?.search);
        let isLogin = true;
        params?.forEach((element: string) => {
            const vals = element.split("=");
            if(vals[0] == "signup" && vals[1] == "true") {
                isLogin = false;
            }
        })

        return (
            <div>
                {!isLogin ? <div>
                    <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop: 150, fontFamily: "Rhodium Libre", color: "#C4C4C4", marginLeft: 400}}>
                        <Link to="/" style={{textDecoration:'none', color: "#C4C4C4"}}>TL;DR Websites</Link>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                            <div style={{boxShadow: "5px 5px 5px 5px #C4C4C4", width: 500, padding: "30px 50px 30px 50px", borderRadius: 25}}>
                                <div style={{fontFamily: "Rhodium Libre", fontSize: 36}}>Sign Up!</div>
                                <input
                                type="text"
                                placeholder= "email"
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
                                {/* TODO: styling */}
                                <div>
                                    Sign up with Google:
                                    <GoogleLogin 
                                    clientId="944387746626-hvgrqhj7ua1vlqsv6u0scddv0ac2djq0.apps.googleusercontent.com"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div style={{display: "flex", alignItems:"center", marginTop: 50}}>
                                    <div style={{textDecoration: "underline", color: "black", marginRight: 180, cursor: "pointer", fontFamily: "Open Sans" }}>
                                        <Link to ="/auth?signup=false" style={{color: "black"}}>Already Have an Account?</Link>
                                    </div>
                                    <div style={button}><Link to="/home" style={{textDecoration: "none", color: "white"}}>Enter</Link></div>
                                </div>
                            </div>
                            
                        </div>
                </div> :
                <div>
                    <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginTop: 150, fontFamily: "Rhodium Libre", color: "#C4C4C4", marginLeft: 400}}>
                        <Link to="/" style={{textDecoration:'none', color: "#C4C4C4"}}>TL;DR Websites</Link>
                        </div>
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
                                {/* TODO: styling */}
                                <div>
                                    Log in with Google: 
                                    <GoogleLogin 
                                    clientId="944387746626-hvgrqhj7ua1vlqsv6u0scddv0ac2djq0.apps.googleusercontent.com"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div style={{display: "flex", alignItems:"center", marginTop: 50}}>
                                    <div style={{textDecoration: "underline", color: "black", marginRight: 180, cursor: "pointer", fontFamily: "Open Sans" }}>
                                        <Link to ="/auth?signup=true" style={{color: "black"}}>Don't Have an Account?</Link>
                                    </div>
                                    <div style={button}><Link to="/home" style={{textDecoration: "none", color: "white"}}>Enter</Link></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Auth;