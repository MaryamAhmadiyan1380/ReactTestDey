import NavbarPage from '../Layouts/NavbarPage'
import ContentPage from '../Layouts/ContentPage'
import FooterPage from '../Layouts/FooterPage'
import React from 'react'
import '../Components/Style/Home.css'
export const Home = () => {
    return(
    <div className="homestyle">
    <NavbarPage />
    <ContentPage />
    <FooterPage />
    </div>
        
    )
}
export default Home;