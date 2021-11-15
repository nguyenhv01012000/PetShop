import React from 'react'
import '../../Styles/Home.css'
import '../../App.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { withRouter } from 'react-router-dom'

function Banner(props) {

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    }

    return (
        <div className="Banner flex">
            <div className="left-banner">
                <Slider {...settings}>
                    <div className="slider-item banner1">
                        <img alt="" className="slider-img-child"></img>
                    </div>
                    <div className="slider-item banner2">
                        <img alt="" className="slider-img-child"></img>
                    </div>
                </Slider>
            </div>
            <div className="right-banner">
                <div className="banner-title">
                    <strong>Platform</strong> for reporting wildlife crime.
                </div>
                <div className="banner-text">
                    Up to a million species are facing extinction - some within the next decade - unless we take immediate action to save them. You can be a part of the solution for endangered species: join and become part of our community.
                </div>
                <div className="banner-btn-list flex">
                    {/* <div 
                        className="banner-btn"
                        onClick={()=>{
                            props.history.push("/dog")
                        }}
                    >Sản phẩm cho chó</div>
                    <div 
                        className="banner-btn"
                        onClick={()=>{
                            props.history.push("/cat")
                        }}
                        className="banner-btn"
                    >Sản phẩm cho mèo</div> */}
                </div>
            </div>
        </div>
    )
}
export default withRouter(Banner)