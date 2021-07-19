// import { useState, useEffect } from 'react';
import "./Dose.css";

const Dose = ({ setDose }) => {
    return (
        <div className="dose">
            <select className="dose-select" onChange={(e) => setDose(e.target.value)}>
                <option value="FIRST">Dose 1</option>
                <option value="SECOND">Dose 2</option>
            </select>
        </div>
    );
}

export default Dose;