// import { useState, useEffect } from 'react';
import "./Commands.css";

const Commands = ({ findHandler, stopHandler }) => {
    return (
        <div className="commands">
            <div className="buttons">
                <button className="find-button" onClick={findHandler}>Find</button>
                <button className="stop-button" onClick={stopHandler}>Stop</button>
            </div>
        </div>
    );
}

export default Commands;
