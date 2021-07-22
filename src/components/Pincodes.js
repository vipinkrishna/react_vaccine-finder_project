// import React, { useRef, useEffect } from 'react';
import React, { useRef } from 'react';
import "./Pincodes.css";

const Pincodes = ({ setPincodes, isEmpty, setIsEmpty }) => {
    const inputRef = useRef()
    // const [parsedPincodes, setParsedPincodes] = useState("");

    // useEffect(() => {
    //     inputRef.current.value = "671531"

    // });

    const pincodesHandler = (e) => {
        const pincodes = e.target.value;
        let pincodesArray = pincodes.trim().split(/\D+/)
        !pincodesArray[0] && pincodesArray.shift()
        !pincodesArray[pincodesArray.length - 1] && pincodesArray.pop()
        setPincodes(pincodesArray)
        // setParsedPincodes(pincodesArray.join(', '))
    }

    return (
        <div className="pincodes">
            <input type="text" ref={inputRef} className={"pincodes-text " + (isEmpty ? "empty" : "")} placeholder="Type Pincode..." onFocus={() => setIsEmpty(false)} onChange={pincodesHandler} />
        </div>
    );
}

export default Pincodes;