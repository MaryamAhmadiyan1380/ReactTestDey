import React from 'react';
import Content_Image from '../Assets/pic6.jpg';
import '../Components/Style/ContentPage.css'
const ContentPage = () => {
    return (
        <div className="contentstyle">
            <img src={Content_Image} style={{width:"700px",height:"500px",marginTop:"30px",marginBottom:"10px"}} />
        </div>
            
        
    );
}

export default ContentPage;
