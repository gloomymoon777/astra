import { useState, useEffect } from 'react'
import Cursor from './Cursor'
import Window from './Window'
import Pomodoro from './Pomodoro'
import './App.css'

import backgroundimg from './assets/backgrounds/herta-station-1.jpg'
import focusIcon from './assets/icons/focus.png'
import environmentsIcon from './assets/icons/environments.png'
import settingsIcon from './assets/icons/settings.png'

import pomoIcon from './assets/icons/pomo.png'
import todoIcon from './assets/icons/tasks.png'
import ambienceIcon from './assets/icons/ambience.png'

// to do : todolist, pomodoro timer ✓, ambience list, other planets, buttons, better colors + futuristic feel
// ascii planet image ; random lines + dots everywhere ; terminal on the right side
// rotating planet / ring somewhere? 
// temperature, humidity, pressure/ weather in general sensors in he bottom left or bottom right corner..

function App() {


  const [currentTime, setCurrentTime] = useState(new Date())
  const secondsToday = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds()
  const dayProgress = (secondsToday / 86400) * 100

  const [openWindows, setOpenWindows] = useState({
    pomo: false, todo: false, ambience: false
  })

  function toggleWindow(name) {
    setOpenWindows(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className = 'workspace' style={{backgroundImage: `url(${backgroundimg})`}}>
      <div className="header">

        <div className="title">
          <h2>ASTRA</h2>
          <p>: herta space station</p>
        </div>

        <div className="top-right">
          <div className="topnav">
            <button className="topnav-button"><img src={focusIcon} className="topnav-icon"/></button>
            <button className="topnav-button"><img src={environmentsIcon} className="topnav-icon" /></button>
            <button className="topnav-button"><img src={settingsIcon} className="topnav-icon"/></button>
          </div>

          <div className="clock">
            <div className="time">
              <h2 className="time-digits">t-{currentTime.toLocaleTimeString('en-US',{
                hour:'2-digit', minute: '2-digit', second: '2-digit', hour12: true
              }).replace(/ AM| PM/, '')}</h2>
              <p className="time-ampm">{currentTime.toLocaleTimeString('en-US', {
                hour12: true
              }).slice(-2)}</p>
            </div>
              
            <div className="time-small-container">
              <div className="weekday">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }).toLowerCase().replace(',', ' · ').replace(',', ' · ')}
              </div> 

              <div className="day progress">
                <div className="day-progress-info">
                  <span>DAY</span> <span> {dayProgress.toFixed(1)}%</span>
                  <div className="day-progress-track">
                    <div className="day-progress-fill" style={{width: `${dayProgress}%`}} />
                  </div>
                </div>
                
              </div>
            </div>
          </div> 

        </div>



        

      </div>
      
      <Cursor />
      
      <div className="side-nav">
        <button className="side-button" onClick={() => toggleWindow('pomo')}><img src={pomoIcon} className="side-icon"/></button>
        <button className="side-button" onClick={() => toggleWindow('todo')}><img src={todoIcon} className="side-icon"/></button>
        <button className="side-button" onClick={() => toggleWindow('ambience')}><img src={ambienceIcon} className="side-icon"/></button>
      </div>

      {openWindows.pomo && (
        <Window title="POMODORO.EXE" initialPosition={{x: 250, y: 180}} onClose={() => toggleWindow('pomo')}>
          <Pomodoro />
        </Window>
      )}

      {openWindows.todo && (
        <Window title="TASKS.TXT" initialPosition={{x: 550, y: 220}} onClose={() => toggleWindow('todo')}><p>coming soon</p></Window>
      )}

      {openWindows.ambience && (
        <Window title="AMBIENCE.MP3" initialPosition={{x: 400, y: 400}} onClose={() => toggleWindow('ambience')}><p>coming soon</p></Window>
      )}

      <footer className="music">
        music player
      </footer>
    </main>
  )
}

export default App
