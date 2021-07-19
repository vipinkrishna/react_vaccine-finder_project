import "./Age.css";

const Age = ({ setAge }) => {
    return (
        <div className="age">
            <select className="age-select" onChange={(e) => setAge(Number(e.target.value))}>
                <option value="18">Age 18+</option>
                <option value="40">Age 40+</option>
                <option value="45">Age 45+</option>
            </select>
        </div>
    );
}

export default Age;