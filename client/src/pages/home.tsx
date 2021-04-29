import * as React from "react";
import TopBar from "./topbar";
import {ISignupPageProps} from './index';

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
    marginTop: '5%',
    width: 50,
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft: '225px'
};

const greyButton: React.CSSProperties= {
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
    marginTop: '5%',
    width: 50,
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft: '225px' 
}

class Home extends React.Component<ISignupPageProps, {showInputField: boolean, input: string}> {
    constructor(props) {
        super(props);
        this.state = {showInputField: true, input: ""};
    }
    render()
    {

            return (<div>
                <TopBar/>
                {this.state.showInputField ? /* show "Summarize Me" menu */
                <div>
                    <div style={{marginLeft: '30%', marginRight: 'auto', marginTop: '200px'}}>
                        <div style={{fontSize: 36, fontFamily: "Rhodium Libre", marginLeft: 10}}>Summarize Me:</div>
                        <input
                            type="text"
                            style={{ fontSize: '36px',
                            border: '5px solid #808080',
                            backgroundColor: '#C4C4C4',
                            display: 'flex',
                            borderRadius: '30px',
                            padding: '5px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            margin: '5px',
                            minHeight: '13px',
                            minWidth: '50%',
                            outline: 'none' }}
                            onChange={e => this.setState({input: e.target.value})}
                            value={this.state.input}
                            />
                        <div style={button} onClick={() => {this.setState({showInputField: false})}}>Go!</div>
                    </div>
                    <div style={{fontFamily: 'Rhodium Libre', color: '#C4C4C4', fontSize: 24, textAlign: 'center', marginTop: 50}}>Enter a website URL or any chunk of text to summarize it!</div>
                </div>
                : /* show results page */
                    <div>
                        <div style={{marginLeft: '30%', marginRight: 'auto', marginTop: '200px'}}>
                        <div style={{fontSize: 36, fontFamily: "Rhodium Libre"}} >We shortened:</div>
                        <div style={{minWidth: 100, marginRight: "40%", borderRadius: 15, minHeight: 50, backgroundColor: "#C4C4C4", color: "white", padding: 10, fontFamily: "Open Sans"}}>{this.state.input}</div>
                        <div style={{fontSize: 36, fontFamily: "Rhodium Libre", marginTop: 25}} >Into...</div>
                        <div style={{minWidth: 100, marginRight: "40%", borderRadius: 15, minHeight: 50, backgroundColor: "#C4C4C4", color: "white", padding: 10, fontFamily: "Open Sans"}}>**SUMMARY HERE**</div>
                        </div>
                        <div style={{display: "flex", marginLeft: "22%"}} className="flex-row">
                            <div style={greyButton} onClick={() => {this.setState({showInputField: true})}}>Back</div>
                            <div style={button} onClick={() => {this.setState({showInputField: true})}}>Save</div>
                        </div>
                    </div>}
                
            </div>);
    }
}

export default Home;