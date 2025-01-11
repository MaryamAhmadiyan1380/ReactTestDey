import '../Components/Style/NotFoundPage.css'
const NotFoundPage = () => {
    return(
        <div style={{marginTop:"10px",backgroundColor:"#f2f2f2",height:"700px"}}>
            <p style={{fontSize:"300px",color:"red"}}>404</p>
            <h3 style={{fontSize:"70px",color:"black"}}>PAGE NOT FOUND</h3>
            <a style={{cursor:"pointer"}} href='/login'>Details This Page,Click Here...</a>
        </div>
    )
}
export default NotFoundPage;