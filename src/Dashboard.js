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
  const [findEnds, setFindEnds] = useState(false);
  // const [findDataEmpty, setFindDataEmpty] = useState(true);

  const [pincodes, setPincodes] = useState([]);
  const [age, setAge] = useState(18);
  const [dose, setDose] = useState("FIRST");

  const [processing, setProcessing] = useState(false);
  const [isPincodeInputEmpty, setIsPincodeInputEmpty] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [watermarkHidden, setWatermarkHidden] = useState(false);

  // const [showAddToHomeButton, setShowAddToHomeButton] = useState(true);

  const [visitCount, setVisitCount] = useState(null);

  // const findDataLength = useCallback(() => findData.length, [findData.length])
  // useEffect(() => {
  //   if (findEnds) {
  //     // window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  //     window.scrollTo({ top: document.documentElement.clientHeight, behavior: "smooth" })
  //     console.log('FOUND!', findEnds)
  //   }
  // }, [findEnds]);

  // useEffect(() => {
  //   if (findEnds && !findData.length) {
  //     console.log('NO RESULTS')
  //     setFindDataEmpty(false)
  //     setFindEnds(false)
  //   }
  //   if (findEnds && findData.length) {
  //     console.log('FOUND RESULTS')
  //     setFindDataEmpty(false)
  //   }
  // }, [findEnds, findData.length]);


  useEffect(() => {
    if (findEnds) {
      if (!findData.length) {
        console.log('Empty Result!')
        setNoResults(true)
      } else {
        console.log('Got Result!')
        window.scrollTo({ top: document.documentElement.clientHeight, behavior: "smooth" })
      }
    }
  }, [findEnds, findData.length])




  const fetchVisitCount = async () => {
    const response = await fetch('https://api.countapi.xyz/hit/vaccineFinder/')
    const result = await response.json()
    setVisitCount(result.value)
  }

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
    console.log('Find Starts!')
    setFindData([])
    // setFindDataEmpty(true)
    setFindEnds(false)
    setNoResults(false)

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
      setIsPincodeInputEmpty(true)
      console.log('Pincode(s) Missing! Find Again...')
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
            setProcessing(false)
            setFindEnds(true)
            console.log('Pincode Error!')
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
      setFindEnds(true)
      console.log('Find Completed!')
      fetchVisitCount()
    }
    pincodes.length && dates.length && age && dose && vaccineFinder()
  }

  // const addToHomeHandler = () => {
  //   setShowAddToHomeButton(false)
  // }
  let className = "watermark"
  if (watermarkHidden) {
    className += "  hideWatermark"
  }

  return (
    <>
      <div className="dashboard">
        <div className="inputs">
          <Pincodes setPincodes={setPincodes} isPincodeInputEmpty={isPincodeInputEmpty} setIsPincodeInputEmpty={setIsPincodeInputEmpty} setWatermarkHidden={setWatermarkHidden} />
          <Age setAge={setAge} />
          <Dose setDose={setDose} />
        </div>
        <Commands findHandler={findHandler} busy={processing} noResults={noResults} />
        {/* <Commands findHandler={findHandler} busy={processing} findDataEmpty={findDataEmpty} /> */}
        <div className={className}>&copy; vipinkrishna 2021 {visitCount && ("#" + visitCount)}</div>
        {/* <div className="watermark" style={watermarkStyle}>&copy; vipinkrishna 2021 {visitCount && ("#" + visitCount)}</div> */}
        {/* <button className="addToHome" onClick={addToHomeHandler} style={{ display: showAddToHomeButton ? 'block' : 'none' }}>Add to Home Screen</button> */}
      </div>
      <div className="findResults">
        <FindResults data={findData} />
      </div>
    </>
  );
}

export default Dashboard;
