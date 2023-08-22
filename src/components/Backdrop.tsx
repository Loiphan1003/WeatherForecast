import React from 'react'


interface BackdropProps {
    onClick: () => void,
}

export const Backdrop = (props: BackdropProps) => {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <div
            className="w-screen h-screen absolute top-0"
            onClick={() => handleClick()}
        />
    )
}
