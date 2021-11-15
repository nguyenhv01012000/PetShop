import React from 'react'
import '../../App.css'
import '../../Styles/Home.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Feedback(props) { 

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 2000, 
        dots: true,
    }

    return ( 
        <div className="Feedback"> 
            <Slider {...settings}>
                <div className="feedback-box flex">
                    <div className="feedback-image">
                        <img src="https://maroon-leaf-0c6.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4fa9d772-2694-4602-8e67-1698f6c7b692%2FUntitled.png?table=block&id=61278aee-bf0e-4a3c-9e42-8e278fdeb53e&spaceId=760030fd-32a3-4f6c-b23d-41fa1e1e1293&width=2000&userId=&cache=v2" alt=""></img>
                    </div>
                    <div className="feedback-text flex-col">
                        <span><strong>Save the monkey in Son Tra</strong></span>
                        <br></br>
                        Recenly found an illegal animal trafficking concerning the monkey in the Son Tra 
                        <br></br>
                        <br></br>
                        <strong>15/11/2012</strong>
                    </div>
                </div> 
                <div className="feedback-box flex">
                    <div className="feedback-image">
                        <img src="https://maroon-leaf-0c6.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F53738e42-00ba-44d1-ac4e-ae649325c6a9%2FUntitled.png?table=block&id=b1919822-a8f4-4a97-9568-7760ffa14103&spaceId=760030fd-32a3-4f6c-b23d-41fa1e1e1293&width=2000&userId=&cache=v2" alt=""></img>
                    </div>
                    <div className="feedback-text flex-col">
                        <span><strong>Save tiger in Nghe Anh</strong></span>
                        <br></br>
                        How to save the tiger in Nghe An during the transportation
                        <br></br>
                        <br></br>
                        <strong>18/06/2021</strong>
                    </div>
                </div> 
                <div className="feedback-box flex">
                    <div className="feedback-image">
                        <img src="https://maroon-leaf-0c6.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F02e5ee4f-d605-4728-8ae5-1f0524451dc7%2FUntitled.png?table=block&id=2e0960c4-421d-46d9-9f63-21fa7efb57b5&spaceId=760030fd-32a3-4f6c-b23d-41fa1e1e1293&width=2000&userId=&cache=v2" alt=""></img>
                    </div>  
                    <div className="feedback-text flex-col"> 
                        <span><strong>Wild animal for eating? Why?</strong></span>
                        <br></br>
                        Recenly found in a village throwing a party with wild animal
                        <br></br>
                        <br></br>
                        <strong>15/11/2020</strong>
                    </div>
                </div> 
            </Slider>
        </div>
    )
}