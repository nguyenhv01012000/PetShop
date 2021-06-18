import React from 'react'
import '../../Styles/Home.css'
import '../../App.css'
import Feature from './Feature'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faTint } from '@fortawesome/free-solid-svg-icons'
import Spa from '../../assets/spa1.png'
import Spa1 from '../../assets/xyz.jpg'
import Slider from 'react-slick'

export default function Features(props) {
    return (
        <div className="Features">  
            <Feature
                reverse={true}
                img={Spa}
                color={"linear-gradient(to right, #00a5e1, rgba(0,127,200,0.5)),linear-gradient(#007fc8, #007fc8)"}
            >
                <div className="feature-intro flex">
                    <div className="feature-title" style={{color: '#FFF'}}>
                        Dịch vụ Spa chuyên nghiệp 
                    </div>
                    <div className="feature-text" style={{color: '#FFF'}}> 
                        <p style={{fontSize: '15px', marginTop: '10px'}}>Tractive rất thấu hiểu tình cảm của những người yêu thú cưng và hiểu được việc vệ sinh, chăm sóc và làm đẹp cho thú cưng là điều thực sự cần thiết để các em phát triển khỏe mạnh cả thể chất và tâm lý. Chính vì thế, chúng tôi đã cho ra đời chuỗi hệ thống Spa & Grooming chuyên nghiệp cho chó mèo và tất cả các loại thú cưng khác tại.</p>
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
                        <strong>Dog Care Service</strong>
                    </div>
                    <div className="feature-text">
                    Emotional support dogs are often identified by wearing an emotional support dog vest or tag, 
                    letting the public know that it is an emotional support dog; otherwise, their handlers will 
                    find themselves having to explain that their dog is an emotional support dog. Some businesses, 
                    such as airlines, prefer to see an identification card or vest that indicates that the dog is an emotional support dog.
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