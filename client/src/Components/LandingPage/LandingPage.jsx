import React from 'react';
import {Link} from "react-router-dom"
import "./LandingPage.css"

//import {connect} from 'react-redux'

export default function LandingPage() {
    return (
        <div className='background'>

       

            <div className='container_landing'>
                <div className='container_white'>
            <h1 className='title_landing'>Pokemon App</h1>
            <h3 className='subtitle'>Developed by Pedro Martinez</h3>
            <div className='container_button'>
            <Link to = "/home">
                <button className='button_detail'>Let's go!</button>
            </Link>
            </div>
            <div className='redes'>

            <ul>
                <a href="https://github.com/PedroMtz8" target="_Blank" rel="noreferrer"><img className='social' src="https://elfreneticoinformatico.com/wp-content/uploads/2017/10/GitHubLogo.png" alt="github" /></a>
                <a href="https://www.linkedin.com/in/pedro-martinez-a7a615239/" target="_blank" rel="noreferrer"><img className='social' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png" alt="linkedin" /></a>
            </ul>
            </div>
                 </div>
            </div>

        </div>
    )
}

