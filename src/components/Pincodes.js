// import { useState, useEffect } from 'react';
import "./Pincodes.css";

const Pincodes = ({ pincodes, setPincodes }) => {
    const pincodesHandler = (e) => {
        const pincodes = e.target.value;
        let pincodesArray = pincodes.trim().split(/\D+/)
        !pincodesArray[0] && pincodesArray.shift()
        !pincodesArray[pincodesArray.length - 1] && pincodesArray.pop()
        setPincodes(pincodesArray)
    }

    return (
        <div className="pincodes">
            <input type="text" defaultValue="671531, 671316" className="pincodes-text" placeholder="Pincodes..." onChange={pincodesHandler} />
        </div>
    );
}

export default Pincodes;