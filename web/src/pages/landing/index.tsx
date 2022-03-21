import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import api from "../../services/api";

import studyIcon from "../../assets/images/icons/study.svg";
import giveclassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleheartIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";


function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    })
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your online study platform.</h2>
        </div>
        <div className="landingImg">
        <img 
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
        </div>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudy
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveclassesIcon} alt="Dar Aulas" />
            Teach
          </Link>
        </div>

        <span className="total-connections">
          Total of {totalConnections} connections made <img src={purpleheartIcon} alt="Coração Roxo" />
        </span>
      
      </div>
    </div>
  )
}

export default Landing;