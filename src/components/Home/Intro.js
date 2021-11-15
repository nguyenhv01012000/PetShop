import React from 'react'
import '../../Styles/Home.css'
import '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faShoppingCart, faEdit, faMobile, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'

export default function Intro(props) {

    return (
        <div className="Intro">
            {/* <div className="top-intro flex-col">
                <div className="intro-title">
                    <strong>Best seller</strong>
                </div>
                <div className="intro-text">
                    Bất kể khi nào hoặc ở đâu, hãy luôn kết nối với chó hoặc mèo của bạn. Với vòng cổ GPS, bạn có thể thấy dấu vết chính xác của người bạn bốn chân của mình. Nhờ hàng rào ảo tích hợp (geofence), Tractive sẽ thông báo cho bạn ngay lập tức trong trường hợp con mèo hoặc con chó của bạn rời khỏi khu vực an toàn được xác định trước. Chỉ cần gắn thiết bị theo dõi thú cưng GPS vào cổ áo và yên tâm.
                </div>
            </div> */}
            <div className="bottom-intro flex-col">
                <div className="intro-title">
                    <strong>How to report </strong> wildlife crime
                </div>
                <div className="flex">
                    <div className="intro-step flex">
                        <div className="intro-step-item flex-col">
                            <div className="intro-step-icon">
                                <FontAwesomeIcon icon={faPhoneVolume} className="icon"/>
                            </div>
                            <div className="intro-step-title">
                                Click on Report Button
                            </div>  
                            <div className="intro-step-text">
                                Show Form Report
                            </div>
                            <div className="intro-step-btn">
                                Click
                            </div>
                        </div>
                    </div>
                    <div className="intro-next">
                        <FontAwesomeIcon icon={faArrowRight} className="icon"/>
                    </div>
                    <div className="intro-step flex">
                        <div className="intro-step-item flex-col">
                            <div className="intro-step-icon">
                                <FontAwesomeIcon icon={faEdit} className="icon"/>
                            </div>
                            <div className="intro-step-title">
                                Enter informations about wildlife crime
                            </div>  
                            <div className="intro-step-text">
                                After entering, click Submit
                            </div>
                            <div className="intro-step-btn">
                                Submit
                            </div>
                        </div>
                    </div>
                    <div className="intro-next">
                        <FontAwesomeIcon icon={faArrowRight} className="icon"/>
                    </div>
                    <div className="intro-step flex">
                        <div className="intro-step-item flex-col">
                            <div className="intro-step-icon">
                                <FontAwesomeIcon icon={faMobile} className="icon"/>
                            </div>
                            <div className="intro-step-title">
                                Handle report!
                            </div>  
                            <div className="intro-step-text">
                                The system will process your report as quickly as possible 
                            </div>
                            <div className="intro-step-btn">
                                Success
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}