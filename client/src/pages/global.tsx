/*
    Just displays ALL user summaries ever requested? (in summarized form)
*/

import * as React from "react";
import { ISignupPageProps } from "./index";
import TopBar from "./topbar";

class Global extends React.Component<ISignupPageProps> {
    constructor(props) {
        super(props);
    }

    render() {

        // REPLACE WITH ALL SUMMARIES FROM DB
        const summaries: string[] = ["test1", "test2"];

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
                    See what others are summarizing 👀
                </div>
                {summaries.map((s) => {
                    return (<div
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
                        <div
                            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
                        >
                            User: koolkat238
                      <hr />
                            {s}
                        </div>
                    </div>)
                })}

            </div>
        );
    }
}

export default Global;