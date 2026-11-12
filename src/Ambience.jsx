

import {useState, useRef, useEffect} from 'react'
import './Ambience.css'

import trainAudio from './assets/sounds/inside-a-train.mp3'
import shipAudio from './assets/sounds/ship-ambience.mp3'
import spaceAudio from './assets/sounds/space-white-noise.mp3'

function Ambience() {
    const channels = [
        {id: 'train', name: 'ASTRAL EXPRESS', code: '[01]', src: trainAudio},
        {id: 'ship', name: 'SPACE STATION', code: '[02]', src: shipAudio},
        {id: 'space', name: 'VOID', code: '[03]', src: spaceAudio}
    ]

    const [playing, setPlaying] = useState({
        train: false, ship: false, space: false
    })

    const [volumes, setVolumes] = useState({
        train: 88, ship: 11, space: 33
    })

    const [masterVolume, setMasterVolume] = useState(100)
    const audioRefs = useRef({})

    useEffect(() => {
        channels.forEach(channel => {
            const audio = audioRefs.current[channel.id]
            if (audio) {
                audio.volume = (volumes[channel.id] / 100) * (masterVolume/100)
            }
        })
    }, [volumes, masterVolume])

    useEffect(() => {
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio) audio.pause()
            })
        }
    }, [])

    async function toggleAudio(id) {
        const audio = audioRefs.current[id]
        if (!audio) return
        if (playing[id]) {
            audio.pause()
            setPlaying(prev => ({...prev, [id]: false }))
        } else {
            try {
                await audio.play()
                setPlaying(prev => ({...prev, [id]: true}))
            } catch (error) {
                console.error('Audio playback failed:', error)
            }
        }
    }

    function changeVolume (id, value) {
        setVolumes(prev => ({
            ...prev, [id]: Number(value)
        }))
    }

    return (
        <div className='ambience'>
            <div className="ambience-header">
                <span>00 // STATION MIX</span>

            </div>

            {channels.map(channel => (
                <div className="audio-channel" key={channel.id}>
                    <audio ref={el => audioRefs.current[channel.id] = el} src={channel.src} loop
                            onEnded={() => setPlaying(prev => ({
                                ...prev, [channel.id]: false
                            }))} />
                    <div className="channel-list">
                        <div className="channel-name">
                            <div className="titlepart">
                                <span className="channel-code">{channel.code}</span>
                                <span className="channel-title">{channel.name}</span>
                                <span className="volume-val">{volumes[channel.id]}%</span>
                            </div>
                            <button className="on-off" onClick={() => toggleAudio(channel.id)}>{playing[channel.id] ? '◆' : '◇'}</button>
                        </div>
                        <div className="channel-controls">
                            <input type="range" min="0" max="100" value={volumes[channel.id]} onChange={e=> changeVolume(channel.id, e.target.value)}
                            style={{'--volume': `${volumes[channel.id]}`}} />
                            

                        </div>
                    </div>


                    

                </div>
            ))}

            <div className="master-vol">
                <div className="master-label">
                    <span>[99] SIGNAL STRENGTH</span> <span>{masterVolume}%</span>
                </div>
                <input type="range" min="0" max="100" value={masterVolume} onChange={e => setMasterVolume(Number(e.target.value))}
                style={{'--volume': `${masterVolume}%`}}/>
            </div>

        </div>
    )
}
export default Ambience