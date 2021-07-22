import "./FindResults.css";
import { default as Card } from './Card';

const FindResults = ({ data }) => {
    return (
        <div className="findData">
            {
                data.map((item, key) => {
                    return <Card item={item} key={key} />
                })
            }
        </div>
    );
}

export default FindResults;