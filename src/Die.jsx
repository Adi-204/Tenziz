import React from "react";

export const Die = (props) =>{
    const styles = {
        backgroundColor : props.isHeld === true ? "#59E391" : "#FFFFFF"
    }
    return(
        <div className="die" style={styles} onClick={()=>props.holdDice(props.id)}>
            <p>{props.value}</p>
        </div>
    )
}
