import React from "react";

const Body = React.lazy(() =>import("../Components/Body"));
function MainBody() {
    return(
        <>
       
        <Body/>
        
        </>
    )
}
export default MainBody;