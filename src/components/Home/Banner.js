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
                    <strong>Shop</strong> dành cho mèo và chó
                </div>
                <div className="banner-text">
                    Shop dành cho chó mèo cung cấp những vật dụng cần thiết như thực phẩm, thực phẩm chức nắng, đồ chơi, ngoài ra còn có spa khám và chữa bệnh cho chó mèo 
                </div>
                <div className="banner-btn-list flex">
                    <div 
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
                    >Sản phẩm cho mèo</div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Banner)