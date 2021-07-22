import React, { useRef, useEffect } from 'react';
import "./Pincodes.css";

const Pincodes = ({ setPincodes, isEmpty, setIsEmpty }) => {
    const inputRef = useRef()

    useEffect(() => {
        const pincodesString = localStorage.getItem('pincodes') || ""
        inputRef.current.value = pincodesString
        const pincodesArray = pincodesStringToArray(pincodesString)
        setPincodes(pincodesArray)
    }, [setPincodes]);

    const pincodesStringToArray = (data) => {
        const pincodesString = data
        let pincodesArray = pincodesString.trim().split(/\D+/)
        !pincodesArray[0] && pincodesArray.shift()
        !pincodesArray[pincodesArray.length - 1] && pincodesArray.pop()
        return pincodesArray
    }

    const pincodesHandler = (e) => {
        const pincodesArray = pincodesStringToArray(e.target.value)
        setPincodes(pincodesArray)
        localStorage.setItem('pincodes', e.target.value)
    }

    return (
        <div className="pincodes">
            <input type="text" ref={inputRef} className={"pincodes-text " + (isEmpty ? "empty" : "")} placeholder="Search by Pincodes..." onFocus={() => setIsEmpty(false)} onChange={pincodesHandler} />
        </div>
    );
}

export default Pincodes;