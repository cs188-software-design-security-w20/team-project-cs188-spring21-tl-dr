import { Link } from "gatsby";
import * as React from "react";
import {ISignupPageProps} from './index';
import TopBar from "./topbar";

class Profile extends React.Component<ISignupPageProps> {
    render()
    {
        return (<div>
            <TopBar/>
            <div style={{marginTop: 100}}>This is the profile page! Click <Link to="/">here</Link> to go back</div>
             </div>);
    }
}

export default Profile;