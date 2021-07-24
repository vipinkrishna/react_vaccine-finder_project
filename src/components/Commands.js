import { useEffect } from 'react';
import "./Commands.css";
import { default as BusyRotator } from './BusyRotator';

// const Commands = ({ findHandler, busy, findDataEmpty }) => {
const Commands = ({ findHandler, busy, noResults, setNoResults }) => {
    useEffect(() => {
        setTimeout(() => {
            setNoResults(false)
        }, 8000);
    }, [noResults, setNoResults]);
    let className = "find-button"
    if (noResults) {
        className += " noresults"
    }
    return (
        <div className="commands">
            {noResults ? <div className="notifyNoresults">No vaccine slots available!</div> : ""}
            {/* <button className={"find-button " + (findDataEmpty ? "noresult" : "")} onClick={findHandler}><BusyText busy={busy} /></button> */}
            {/* <button className="find-button" onClick={findHandler}><BusyText busy={busy} /></button> */}
            <button className={className} onClick={findHandler}><BusyRotator busy={busy} /></button>
        </div>
    );
}

export default Commands;
