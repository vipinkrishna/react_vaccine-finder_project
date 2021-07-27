import "./Card.css";

const Card = ({ item }) => {
    return (
        // <div className="card">
        //     <div className="keys">
        //         <label>Date</label>
        //         <label>Center</label>
        //         <label>Address</label>
        //         <label>Pin</label>
        //         <label>Age</label>
        //         <label>Vaccine</label>
        //         <label>1<sup>st</sup> Dose</label>
        //         <label>2<sup>nd</sup> Dose</label>
        //         <label>Fee</label>
        //     </div>
        //     <div className="values">
        //         <div className="date"><span>{item.datestamp}</span></div>
        //         <div className="name"><span>{item.name}</span></div>
        //         <div className="address"><span>{item.address}</span></div>
        //         <div className="pin"><span>{item.pincode}</span></div>
        //         <div className="ageLimit"><span>{item.min_age_limit}</span></div>
        //         <div className="vaccine"><span>{item.vaccine}</span></div>
        //         <div className="dose1"><span>{item.available_capacity_dose1}</span></div>
        //         <div className="dose2"><span>{item.available_capacity_dose2}</span></div>
        //         <div className="feeType"><span className={item.fee_type}>{item.fee_type}</span></div>
        //     </div>
        // </div>

        <div className="card">
            <div className="date"><label>Date</label><span>{item.datestamp}</span></div>
            <div className="name"><label>Center</label><span>{item.name}</span></div>
            <div className="address"><label>Address</label><span>{item.address}</span></div>
            <div className="pin"><label>Pin</label><span>{item.pincode}</span></div>
            <div className="ageLimit"><label>Age</label><span>{item.min_age_limit}</span></div>
            <div className="vaccine"><label>Vaccine</label><span>{item.vaccine}</span></div>
            <div className="dose1"><label>1<sup>st</sup> Dose</label><span>{item.available_capacity_dose1}</span></div>
            <div className="dose2"><label>2<sup>nd</sup> Dose</label><span>{item.available_capacity_dose2}</span></div>
            <div className="feeType"><label>Fee</label><span className={item.fee_type}>{item.fee_type}</span></div>
        </div>
    );
}

export default Card;