import React, { useState } from 'react';
import './Dashboard.css';
import { default as Pincodes } from './components/Pincodes';
import { default as Age } from './components/Age';
import { default as Dose } from './components/Dose';
import { default as Commands } from './components/Commands';

function Dashboard() {

  let clear
  let processing = false
  let abort = false

  const [pincodes, setPincodes] = useState([671531, 671316]);
  const [age, setAge] = useState(18);
  const [dose, setDose] = useState("FIRST");

  // document.body.requestFullscreen()

  const findHandler = () => {
    if (processing) {
      return
    }
    processing = true
    abort = false

    // PICKS DATES FROM TODAY UPTO 8 DAYS
    let today = new Date()
    const dates = []
    for (let i = 0; i < 3; i++) {
      dates.push(today.toLocaleDateString('nl', { day: "2-digit", month: "2-digit", year: "numeric" }))
      today.setDate(today.getDate() + 1)
    }

    let counter = 1
    let session_counter

    // DELAY FUNCTION
    const wait = (milliseconds) => new Promise((settle) => { clear = setTimeout(settle, milliseconds) })

    // GENERATES BEEP SOUND
    var context = new window.AudioContext()
    function beep(duration = 500) {
      var oscillator = context.createOscillator()
      var gain = context.createGain()
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.frequency.value = 800
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + (duration / 1000))
    }

    // PADDING
    let pad = (number) => (number <= 999 ? `00${number}`.slice(-3) : number.toString())

    if (!pincodes.length) {
      console.info('Missing "pincodes"...')
      return "https://github.com/vipinkrishna"
    }
    (async function vaccineFinder() {
      console.log(`%c############################[%cPASS ${pad(counter++)}%c]################################`, 'color: red', 'color: yellow', 'color: red')

      session_counter = 1

      for (let pincode of pincodes) {
        if (abort) {
          clearTimeout(clear)
          processing = false
          break
        }
        for (let date of dates) {
          if (abort) {
            clearTimeout(clear)
            processing = false
            break
          }
          console.log(`%c${pincode} - %c${date}`, 'color: yellow', 'color: orange')
          let endpoint = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pincode + "&date=" + date
          let response
          try {
            response = await fetch(endpoint)
            if (!response.ok) throw new Error(response.statusText)
          } catch (err) {
            console.warn(err.message)
            console.warn('Check Pincode and try again...!')
            return "https://github.com/vipinkrishna"
          }
          let { sessions } = await response.json()

          for (let session of sessions) {
            if (abort) {
              clearTimeout(clear)
              processing = false
              break
            }
            const { date: datestamp, address, pincode, available_capacity, available_capacity_dose1, available_capacity_dose2, vaccine, min_age_limit } = session
            if (min_age_limit === age && ((dose === "FIRST") ? available_capacity_dose1 : available_capacity_dose2) > 0) {
              console.log('\n%c================================================================', 'color: yellow')
              console.log(`SESSION:${session_counter++} - ${dose} DOSE - AGE:${min_age_limit}`)
              console.log('%c================================================================', 'color: yellow')
              console.log("Date: %c" + datestamp, 'color: orange')
              console.log("Vaccine Name: %c" + vaccine, 'color: cyan')
              console.log("Address: " + address + " Pincode: %c" + pincode, 'color: yellow')
              console.log("Available Capacity: ", available_capacity)
              console.log("Available Capacity for DOSE 1: ", available_capacity_dose1)
              console.log("Available Capacity for DOSE 2: ", available_capacity_dose2)
              console.log("%c================================================================\n\n", 'color: yellow')
              beep(2000)
            }
          }  //FOR
          await wait(200)  //SESSION
          clearTimeout(clear)
        }  //FOR
      }  //FOR
      console.log(`%c######################################################################\n\n`, 'color: red')
      if (!abort) {
        await wait(180000)  //PASS
        clearTimeout(clear)
      }
      if (pincodes.length && dates.length && age && dose && !abort) {
        processing = true
        vaccineFinder()
      } else {
        clearTimeout(clear)
        processing = false
      }
    })()
  }

  const stopHandler = () => {
    abort = true
    clearTimeout(clear)
    window.location.reload()
  }

  return (
    <div className="dashboard">
      <Pincodes pincodes={pincodes} setPincodes={setPincodes} />
      <Age setAge={setAge} />
      <Dose setDose={setDose} />
      <Commands findHandler={findHandler} stopHandler={stopHandler} />
    </div>
  );
}

export default Dashboard;
