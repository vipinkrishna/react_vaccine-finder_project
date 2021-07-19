import "./Pincodes.css";

const Pincodes = ({ setPincodes, isEmpty, setIsEmpty }) => {
    const pincodesHandler = (e) => {
        const pincodes = e.target.value;
        let pincodesArray = pincodes.trim().split(/\D+/)
        !pincodesArray[0] && pincodesArray.shift()
        !pincodesArray[pincodesArray.length - 1] && pincodesArray.pop()
        setPincodes(pincodesArray)
    }

    return (
        <div className="pincodes">
            <input type="text" className={"pincodes-text " + (isEmpty ? "empty" : "")} placeholder="Enter your Pincode(s)..." onFocus={() => setIsEmpty(false)} onChange={pincodesHandler} />
        </div>
    );
}

export default Pincodes;