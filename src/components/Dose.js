// import { useState, useEffect } from 'react';
import "./Dose.css";

const Dose = ({ setDose }) => {
    return (
        <div className="dose">
            <select className="dose-select" onChange={(e) => setDose(e.target.value)}>
                <option value="FIRST">FIRST</option>
                <option value="SECOND">SECOND</option>
            </select>
        </div>
    );
}

export default Dose;