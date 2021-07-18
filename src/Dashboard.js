import React, { useState } from 'react';
import './Dashboard.css';
import { default as Pincodes } from './components/Pincodes';
import { default as Age } from './components/Age';
import { default as Dose } from './components/Dose';
import { default as Commands } from './components/Commands';
import { default as FindResults } from './components/FindResults';

// COMPONENT
function Dashboard() {
  const [findData, setFindData] = useState([]);

  const [pincodes, setPincodes] = useState([671531, 671316]);
  const [age, setAge] = useState(18);
  const [dose, setDose] = useState("FIRST");

  const [processing, setProcessing] = useState(false);

  const [busy, setBusy] = useState(false);

  // DELAY
  const wait = (milliseconds) => new Promise((settle) => { setTimeout(settle, milliseconds) })

  // PICKS DATES FROM TODAY UPTO 5 DAYS
  function upcomingDates() {
    let today = new Date()
    const dates = []
    for (let i = 0; i < 5; i++) {
      dates.push(today.toLocaleDateString('nl', { day: "2-digit", month: "2-digit", year: "numeric" }))
      today.setDate(today.getDate() + 1)
    }
    return dates
  }

  // FIND HANDLER
  function findHandler() {
    if (processing) {
      console.log('Processing!')
      return
    }
    setProcessing(true)
    setBusy(true)
    console.log('Find Starts!')
    setFindData([])

    // BEEP SOUND
    var context = new window.AudioContext()
    function beep(duration = 500) {
      var oscillator = context.createOscillator()
      var gain = context.createGain()
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.frequency.value = 1200
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + (duration / 1000))
    }

    const dates = upcomingDates()

    if (!pincodes.length) {
      setProcessing(false)
      setBusy(false)
      console.log('Find Done! Find Again...')
      return
    }
    async function vaccineFinder() {
      for (let pincode of pincodes) {
        for (let date of dates) {
          let endpoint = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + date
          let response
          try {
            response = await fetch(endpoint)
            if (!response.ok) throw new Error(response.statusText)
          } catch (err) {
            console.warn(err.message)
            return
          }
          let { sessions } = await response.json()

          for (let session of sessions) {
            const { date: datestamp, name, address, pincode, available_capacity_dose1, available_capacity_dose2, vaccine, min_age_limit } = session
            if (min_age_limit === age && ((dose === "FIRST") ? available_capacity_dose1 : available_capacity_dose2) > 0) {
              setFindData(prevState => [...prevState, { datestamp, pincode, name, address, vaccine, min_age_limit, available_capacity_dose1, available_capacity_dose2 }])
              beep(200)
              await wait(500)
            }
          }
          await wait(100)
        }
      }
      setProcessing(false)
      setBusy(false)
      console.log('Find Done! Find Again...')
    }
    pincodes.length && dates.length && age && dose && vaccineFinder()
  }

  return (
    <>
      <div className="dashboard">
        <Pincodes pincodes={pincodes} setPincodes={setPincodes} />
        <Age setAge={setAge} />
        <Dose setDose={setDose} />
        <Commands findHandler={findHandler} busy={busy} />
      </div>
      <div className="findResults">
        <FindResults data={findData} />
      </div>
    </>
  );
}

export default Dashboard;
