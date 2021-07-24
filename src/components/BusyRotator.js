import "./BusyRotator.css";

const BusyRotator = ({ busy }) => {
    return (
        <>
            {
                busy ? <div className="rotator" /> : "Find"
            }
        </>
    );
}

export default BusyRotator;
