import React from "react";

export default function Box(props) {
    return(
        <>
        <div style={props.styles} className="box" onClick={()=>props.handleClick(props.id)}>{props.value}</div>
        </>
    )
}