import React, { useRef, useEffect } from 'react';
import "./Pincodes.css";

const Pincodes = ({ setPincodes, isPincodeInputEmpty, setIsPincodeInputEmpty, setWatermarkHidden }) => {
    const inputRef = useRef()

    useEffect(() => {
        const pincodesString = localStorage.getItem('pincodes') || ""
        inputRef.current.value = pincodesString
        const pincodesArray = pincodesStringToArray(pincodesString)
        setPincodes(pincodesArray)
    }, [setPincodes]);

    useEffect(() => {
        // inputRef.current.focus()
        setTimeout(() => {
            setIsPincodeInputEmpty(false)
        }, 600);
    }, [isPincodeInputEmpty, setIsPincodeInputEmpty]);


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
                <input type="search" ref={inputRef} className={"pincodes-text " + (isPincodeInputEmpty ? "empty" : "")} placeholder="Search by Pincodes..." onFocus={() => setWatermarkHidden(true)} onBlur={() => setWatermarkHidden(false)} onChange={pincodesHandler} />
            {/* <div className="pincodes-text-wrapper"> */}
                {/* <input type="text" ref={inputRef} className={"pincodes-text " + (isPincodeInputEmpty ? "empty" : "")} placeholder="Search by Pincodes..." onFocus={() => setWatermarkHidden(true)} onBlur={() => setWatermarkHidden(false)} onChange={pincodesHandler} /> */}
                {/* <span className="close-button"></span> */}
            {/* </div> */}
            {/* <input type="text" ref={inputRef} className={"pincodes-text " + (isPincodeInputEmpty ? "empty" : "")} placeholder="Search by Pincodes..." onFocus={() => setWatermarkHidden(true)} onBlur={() => setWatermarkHidden(false)} onChange={pincodesHandler} /> */}
            {/* <input type="text" ref={inputRef} className={"pincodes-text " + (isPincodeInputEmpty ? "empty" : "")} placeholder="Search by Pincodes..." onFocus={() => setIsPincodeInputEmpty(false)} onChange={pincodesHandler} /> */}
        </div>
    );
}

export default Pincodes;