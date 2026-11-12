import {useState, useEffect} from 'react'
import './Pomodoro.css'

function Pomodoro() {
    const [mode, setMode] = useState('focus')
    const [remaining, setRemaining] = useState(25*60)
    const [isRunning, setIsRunning] = useState(false)
    const totalSeconds = mode === 'focus' ? 25 * 60 : 5 * 60
    const progress = remaining / totalSeconds

    const minutes = Math.floor(remaining/60)
    const seconds = remaining % 60

    const radius = 124
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference * (1- progress)


    

    useEffect(() => {
        if (!isRunning || remaining === 0) return
        const timer = setInterval(() => {
            setRemaining(prev => Math.max(0, prev-1))
        }, 1000)

        return () => clearInterval(timer)
    }, [isRunning, remaining])

    useEffect(() => {
        if (remaining === 0) setIsRunning(false)
    }, [remaining])

    function changeMode(newMode) {
        setMode(newMode)
        setRemaining(newMode === 'focus' ? 25 * 60 : 5 * 60)
        setIsRunning(false)
    }
    function abortTimer() {
        setRemaining(totalSeconds)
        setIsRunning(false)
    }
    

    const ticks = Array.from({length: 60}, (_,i) => {
        const angle = (i*6 - 90) * Math.PI / 180
        const outer = i % 5 === 0 ? 127 : 120
        const inner = i % 5 === 0 ? 117 : 115
        return {
            x1: 130 + Math.cos(angle) * inner,
            y1: 130 + Math.sin(angle) * inner,
            x2: 130 + Math.cos(angle) * outer,
            y2: 130 + Math.sin(angle) * outer,
            major: i % 5 === 0
            
        }
    })

    const numbers = Array.from({length: 12}, (_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180

        return {
            value: String(i*5).padStart(2, '0'),
            x: 130 + Math.cos(angle) * 94,
            y: 130 + Math.sin(angle) * 94
        }
    })



    return (
        <div className ="pomodoro">

            <div className = "display">
                <svg className="pomo-dial" viewBox="0 0 260 260">
                    <circle className="dialtrack" cx = "130" cy = "130" r = {radius} />
                    <circle className="dialprogress" cx = '130' cy = '130' r = {radius} strokeDasharray={circumference} 
                        strokeDashoffset={dashOffset} />
                    <circle className="dial-ring outer" cx='130' cy='130' r='108' />
                    <circle className="dial-ring" cx="130" cy="130" r='80' />
                    <circle className="dial-ring inner" cx="130" cy="130" r='55' />
                    <circle className="dial-ring" cx="130" cy="130" r='40' />

                    <line className="dial-crosshair" x1="130" y1="33" x2="130" y2="227" />
                    <line className="dial-crosshair" x1="33" y1="130" x2="227" y2="130" />
                    
                    {ticks.map((tick, i) => (
                        <line key={i} className={tick.major ? 'dial-tick major' : 'dial-tick'}
                        x1 = {tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
                    ))}

                    {numbers.map((number, i) => (
                        <text key={i} className="dial-number" x={number.x} y = {number.y} 
                            textAnchor='middle' dominantBaseline="middle">{number.value}</text>
                    ))}

                    <circle className="target-circle" cx="130" cy = "130" r= "6" />
                    <circle className="target-circle" cx="130" cy = "130" r= "2" />

                </svg>

                <div className="pomo-center">
                    <div className="pomo-time">
                        {String(minutes).padStart(2, '0')}·
                        {String(seconds).padStart(2, '0')}
                    </div>
                    <div className="pomo-status">
                        {remaining === 0 ? 'COMPLETE' : isRunning ? "SYSTEM ACTIVE" : "STANDBY"} 
                    </div>
                </div>

            </div>
            <div className = "pomo-bottom">
                <div className="pomo-actions">
                    <button onClick={abortTimer}>ABORT</button>

                    <button className="pomo-start" onClick={() => setIsRunning(prev => !prev)} disabled={remaining === 0}>
                        {isRunning ? "PAUSE ◆︎" : "BEGIN ◇"}
                    </button>

                </div>

                <div className="pomo-toggle">
                    <button className={mode === 'focus' ? 'selected' : ''} onClick={() => changeMode('focus')}>◇ FOCUS</button>
                    <button className={mode === 'break' ? 'selected' : ''} onClick={() => changeMode("break")}>BREAK</button>
                </div>
                
                
            </div>
        </div>
    )
}

export default Pomodoro