import "./Commands.css";
import { default as BusyText } from './BusyText';

const Commands = ({ findHandler, busy }) => {
    return (
        <div className="commands">
            <button className="find-button" onClick={findHandler}><BusyText busy={busy} /></button>
        </div>
    );
}

export default Commands;
