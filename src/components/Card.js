// import { useState, useEffect } from 'react';
import "./Card.css";

const Card = ({ item }) => {
    return (
        <div className="card">
            <div className="date"><label>Date: </label>{item.datestamp}</div>
            <div className="name"><label>Name: </label>{item.name}</div>
            <div className="address"><label>Address: </label>{item.address}</div>
            <div className="pin"><label>Pin: </label>{item.pincode}</div>
            <div className="ageLimit"><label>Age: </label>{item.min_age_limit}</div>
            <div className="vaccine"><label>Vaccine: </label>{item.vaccine}</div>
            <div className="dose1"><label>First Dose: </label>{item.available_capacity_dose1}</div>
            <div className="dose2"><label>Second Dose: </label>{item.available_capacity_dose2}</div>
        </div>
    );
}

export default Card;