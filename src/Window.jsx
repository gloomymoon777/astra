

import {useState, useRef } from 'react'

function Window({title, children, onClose, initialPosition}) {
    const [position, setPosition] = useState(initialPosition)
    const dragOffset = useRef(null)

    function handlePointerDown(e) {
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    function handlePointerMove(e) {
        if (!dragOffset.current) return
        setPosition({
            x: e.clientX - dragOffset.current.x,
            y: e.clientY - dragOffset.current.y
        })
    }


    function handlePointerUp() {
        dragOffset.current = null
    }

    return (

        <div className="draggable-window" style = {{left: position.x, top: position.y}}>
            <div className="window-label" data-cursor="drag" onPointerDown={handlePointerDown} 
                    onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>{title}</div>
            <div className="window-content"></div>

            <span className="corner top-left" />
            <span className="corner bottom-left" />
            <span className= "corner bottom-right" />
                
            <button 
                data-cursor="close" 
                className="window-close" 
                onClick = {onClose} 
                onPointerDown={e => e.stopPropagation()}
            >
                <span className="close-inner"/>
            </button>
            <div className="window-content">{children}</div>
        </div>
    )
}

export default Window