// import { useState, useEffect } from 'react';
import "./Commands.css";

const Commands = ({ findHandler }) => {
    return (
        <div className="commands">
            <button className="find-button" onClick={findHandler}>Find</button>
        </div>
    );
}

export default Commands;
