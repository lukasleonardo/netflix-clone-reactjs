import React from 'react'
import './Header.css'

const Header = ({isHeaderBlack}) => {


    return (
        <header className={isHeaderBlack?'black':''}>
            <div className="header--logo"><a href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt=""></img></a></div>
            <div className="header--user"><a href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt=""></img></a></div>
        </header>
    )
}

export default Header
