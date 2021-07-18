import "./BusyText.css";

const BusyText = ({ busy }) => {
    return (
        <>
            {
                busy ? <div className="rotator" /> : "Find"
            }
        </>
    );
}

export default BusyText;
