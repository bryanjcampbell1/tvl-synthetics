import React from "react";

function Banner() {
    return (
        <div style={{textAlign:'center'}}>
            <p style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 70,
                fontStyle: "italic",
                fontVariant: "normal",
                fontWeight: '900',
                color:'rgb(22,162,185)'
            }}>TVL Synths</p>

            <p style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 15,
                fontVariant: "normal",
                fontWeight: '900',
                color:'rgb(22,162,185)'
            }}> Derivatives For Your Favorite DeFi Protocols </p>
        </div>
    );
}

export default Banner;
