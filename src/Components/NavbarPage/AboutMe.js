import React from 'react';
import AboutPic from '../../Assets/AboutPic.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarPage from '../../Layouts/NavbarPage';
import '../Style/Aboutme.css';  

const About = () => {
    return (
        <>
            <NavbarPage />
            <div className="grey-background">
                <div>
                    <h1 style={{ color: "orange",fontSize:"70px" }}>About Me</h1>
                </div>
                <img src={AboutPic} alt="my Profile pic" className="aboutimg" />
                <p className="loremstyle">
              <i ><b>Email:</b> <br /></i>
              <span>mrymahmdyan712@gmail.com</span>
              <br/>
              <i><b>Role:</b></i>
              <span>Lead Designer :<br/> Mr HassanPour <br/>Performed By:<br/> Maryam Ahmadiyan</span>
              <br/>
              <i style={{fontSize:"20px"}}><b>Phone For Questions:</b></i>
              <br/>
                <span>09114755524</span>

              
                </p>
            </div>
        </>
    );
}

export default About;


