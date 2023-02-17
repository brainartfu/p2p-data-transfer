import React from 'react'
import cuckoologo from '../../Icons/cuckoo-logo.svg'
import GitHubButton from 'react-github-btn'
import '../Navigation/Navigation.css'

const Navigation = () => {
    return (
        <header className="dropShadow">
            <div className="headerWrapper">
                <div className="headerContainer flex">
                    <div className="headerLogoLinkWrapper">
                        <div className="headerLogoLink">
                        <a href='/'>
                            <div className="headerLogo flex flex-row">
                                <div className="logoImg">
                                    <img src={cuckoologo} alt="Cuckoo Logo"/>
                                </div>
                                <div className="logoText">
                                    P2P File Transfer
                                </div>
                            </div>
                        </a>
                        </div>
                    </div>
                    <div className="githubStar">
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Navigation