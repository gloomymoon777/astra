import { useState, useEffect } from 'react'
import defaultCursor from './assets/cursors/cursor.png'
import closeCursor from './assets/cursors/close.png'
import hoverCursor from './assets/cursors/hover.png'
import linkCursor from './assets/cursors/link.png'
import squareCursor from './assets/cursors/square.png'

function Cursor() {
    const [position, setPosition] = useState({x: 0, y: 0})
    const [cursorType, setCursorType] = useState('default')
    const [visible, setVisible ] = useState(false)

    const cursors = {
        default: defaultCursor,
        close: closeCursor,
        hover: hoverCursor,
        link: linkCursor,
        drag: squareCursor
    }


    useEffect(() => {
        const handleMouseEnter = () => setVisible(true)
        const handleMouseLeave = () => setVisible(false)

        const moveCursor = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY
            })

            const target = document.elementFromPoint(e.clientX, e.clientY)

            if(!target) return

            if (target.closest('[data-cursor="close"]')) {
                setCursorType('close')
            } else if (target.closest('[data-cursor="link"]')) {
                setCursorType('link')
            } else if (target.closest('[data-cursor="drag"]')) {
                setCursorType('drag')
            } else if (target.closest('button, [data-cursor="hover"]')) {
                setCursorType('hover')
            } else {
                setCursorType('default')
            }

        }



        window.addEventListener('mousemove', moveCursor)

        document.documentElement.addEventListener('mouseenter', handleMouseEnter)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div className="custom-cursor" style={{
            left: `${position.x}px`, top: `${position.y}px`, display: visible ? 'block' : 'none'
        }}>
            <img src={cursors[cursorType]}/>
        </div>
    )
}

export default Cursor