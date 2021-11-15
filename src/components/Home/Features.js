import React from 'react'
import '../../Styles/Home.css'
import '../../App.css'
import Feature from './Feature'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faTint } from '@fortawesome/free-solid-svg-icons'
import Spa from '../../assets/Anytime-Anywhere-Any-device.jpg'
import Spa1 from '../../assets/pic2.png'
import Slider from 'react-slick'

export default function Features(props) {
    return (
        <div className="Features">  
            <Feature
                reverse={true}
                img={Spa}
                color={"#00c85a"}
            >
                <div className="feature-intro flex">
                    <div className="feature-title" style={{color: '#FFF'}}>
                        Report anywhere anytime
                    </div>
                    <div className="feature-text" style={{color: '#FFF'}}> 
                        <p style={{fontSize: '15px', marginTop: '10px'}}>Find a illegal animal trafficking you want to report immediately at all time </p>
                        <br/><br/>
                        {/* <strong style={{fontSize: '18px'}}>Bạn không thể chờ đợi để xem?</strong>
                        <br/>
                        <p style={{fontSize: '15px', marginTop: '10px'}}>The Pack sẽ công chiếu vào ngày 20 tháng 11 tại hơn 240 quốc gia và vùng lãnh thổ, độc quyền trên Prime Video. Truy cập amazon.com/ThePack để tìm hiểu thêm.</p> */}
                    </div>
                </div>
            </Feature>
            <Feature
                reverse={false}
                img={Spa1}
                color={"#f5f6f8"}
            >
                <div className="feature-intro flex">
                    <div className="feature-title">
                        <strong>Maps of recent animal trafficking </strong>
                    </div>
                    <div className="feature-text">
                    Find a illegal animal trafficking you want to report immediately at all time 
                    </div>
                    {/* <div className="feature-icon-list flex">
                            <div className="feature-icon-item">
                                <FontAwesomeIcon icon={faMapMarker} style={{fontSize: '40px', color : '#007FC8'}}/>
                                <p>Theo Dõi trực tiếp</p>
                            </div>
                            <div className="feature-icon-item">
                                <FontAwesomeIcon icon={faTint} style={{fontSize: '40px', color : '#007FC8'}}/>
                                <p>100% chống nước</p>
                            </div>
                    </div> */}
                </div>
            </Feature>
        </div>
    )
}