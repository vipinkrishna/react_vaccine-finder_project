import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { default as Pincodes } from './components/Pincodes';
import { default as Age } from './components/Age';
import { default as Dose } from './components/Dose';
import { default as Commands } from './components/Commands';
import { default as FindResults } from './components/FindResults';

// COMPONENT
function Dashboard() {
  const [findData, setFindData] = useState([]);
  const [found, setFound] = useState(false);

  // const [pincodes, setPincodes] = useState([671531, 671316]);
  const [pincodes, setPincodes] = useState([560076]);
  const [age, setAge] = useState(18);
  const [dose, setDose] = useState("FIRST");

  const [processing, setProcessing] = useState(false);

  const [busy, setBusy] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  // const [parsedPincodes, setParsedPincodes] = useState("");

  // const [showAddToHomeButton, setShowAddToHomeButton] = useState(true);



  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    if (found) {
      // window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      window.scrollTo({ top: document.documentElement.clientHeight, behavior: "smooth" })
    }
  }, [found]);

  useEffect(() => {
    fetchVisitCount()
    if (typeof (Storage) !== "undefined") {
      // localStorage
    } else {
      // Sorry! No Web Storage support
    }
    return () => {

    }
  }, []);

  const fetchVisitCount = async () => {
    const response = await fetch('https://api.countapi.xyz/hit/vaccineFinder/')
    const result = await response.json()
    setVisitCount(result.value)
  }

  // useEffect(() => {
  //   console.log('useEffect()')
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     let deferredPrompt = e;
  //     console.log(deferredPrompt)
  //     // addBtn.style.display = 'block';
  //     // addBtn.style.display = 'none';
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the A2HS prompt');
  //       } else {
  //         console.log('User dismissed the A2HS prompt');
  //       }
  //       deferredPrompt = null;
  //     });
  //   });
  // }, [showAddToHomeButton]);

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
    setFound(false)

    // BEEP SOUND
    var context = new window.AudioContext()
    function beep(duration = 500) {
      var oscillator = context.createOscillator()
      var gain = context.createGain()
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.frequency.value = 2500
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + (duration / 1000))
    }

    const dates = upcomingDates()

    if (!pincodes.length) {
      setProcessing(false)
      setBusy(false)
      setIsEmpty(true)
      console.log('Enter Pincode(s)! Find Again...')
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
            const { date: datestamp, name, address, pincode, available_capacity_dose1, available_capacity_dose2, vaccine, min_age_limit, fee_type } = session
            if (min_age_limit === age && ((dose === "FIRST") ? available_capacity_dose1 : available_capacity_dose2) > 0) {
              setFindData(prevState => [...prevState, { datestamp, pincode, name, address, vaccine, min_age_limit, available_capacity_dose1, available_capacity_dose2, fee_type }])
              beep(200)
              await wait(300)
            }
          }
          await wait(50)
        }
      }
      setProcessing(false)
      setBusy(false)
      setFound(true)
      console.log('Find Done! Find Again...')
    }
    pincodes.length && dates.length && age && dose && vaccineFinder()
  }

  // const addToHomeHandler = () => {
  //   setShowAddToHomeButton(false)
  // }

  return (
    <>
      <div className="dashboard">
        <div className="inputs">
          <Pincodes setPincodes={setPincodes} isEmpty={isEmpty} setIsEmpty={setIsEmpty} />
          <Age setAge={setAge} />
          <Dose setDose={setDose} />
        </div>
        <Commands findHandler={findHandler} busy={busy} />
        <div className="watermark">vaccineFinder &copy; vipinkrishna 2021 {visitCount && ("#" + visitCount)}</div>
        {/* <button className="addToHome" onClick={addToHomeHandler} style={{ display: showAddToHomeButton ? 'block' : 'none' }}>Add to Home Screen</button> */}
      </div>
      <div className="findResults">
        <FindResults data={findData} />
      </div>
    </>
  );
}

export default Dashboard;
