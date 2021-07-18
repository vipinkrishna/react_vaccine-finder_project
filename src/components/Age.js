// import { useState, useEffect } from 'react';
import "./Age.css";

const Age = ({ setAge }) => {
    return (
        <div className="age">
            <select className="age-select" onChange={(e) => setAge(Number(e.target.value))}>
                <option value="18">18</option>
                <option value="40">40</option>
                <option value="45">45</option>
            </select>
        </div>
    );
}

export default Age;