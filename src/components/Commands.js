import "./Commands.css";
import { default as BusyText } from './BusyText';

// const Commands = ({ findHandler, busy, findDataEmpty }) => {
const Commands = ({ findHandler, busy, noResults }) => {
    // console.log("findDataEmpty: ", findDataEmpty)
    // console.log('COMMANDS COMPONENT')
    let className = "find-button"
    if (noResults) {
        className += " noresults"
    }
    return (
        <div className="commands">
            {/* <button className={"find-button " + (findDataEmpty ? "noresult" : "")} onClick={findHandler}><BusyText busy={busy} /></button> */}
            {/* <button className="find-button" onClick={findHandler}><BusyText busy={busy} /></button> */}
            <button className={className} onClick={findHandler}><BusyText busy={busy} /></button>
        </div>
    );
}

export default Commands;
