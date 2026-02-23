import {useEffect} from "react";

import Provider from "./context.jsx";
import NavigationBar from "./Components/NavigationBar.jsx";
//import ToolBar from "./Components/ToolBar.jsx";
import Content from "./Components/Content.jsx";
import "./style.css";

export default function FileViewer(props) {

    //Temporary Warning Dialog while app is under construction
    const setAppDialog = props.setAppDialog;
    const title="⚠️ Warning ⚠️";
    const info="This app is currently under construction! Most planned features will not be available or work as intended.";
    const actions={
        "Ok":()=>{setAppDialog(null)}
    };
    useEffect(()=>{
        setAppDialog({title,info,actions});
    },[]);

    return (
        <Provider>
                <NavigationBar />
                {/*Coming Soon... <ToolBar />*/}
                    <Content />
        </Provider>

    )

}