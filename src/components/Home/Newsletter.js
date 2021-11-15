import React, { useState } from 'react'
import '../../App.css'
import '../../Styles/Home.css'
import axios from 'axios'

export default function Newsletter(props) {

    const [emailInput, setEmailInput] = useState("")

    const handleOnSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/reviews/', {
            email: emailInput
        }) 
        .then(res => {
            alert(res.data)
        })
        .catch(err => {
            alert(err.response.data)
        })
        setEmailInput("")
    }

    return (
        <div>
            <div className="invitejoin">
                <div className="invitejoin-title">
                    <strong>Partners</strong>
                </div>
                {/* <div className="invitejoin-text">
                    Đây là một số cộng sư tuyện vời mà chúng tôi đang làm việc chung để tạo nên một thế giới tốt đẹp hơn.
                </div> */}
                <div className="invitejoin-img flex-center">
                    <img src="http://www.zoohackathon.com/media/1148/vulcan-inc-logo.png" alt=""></img>
                    <img src="http://www.zoohackathon.com/media/1150/microsoft_image.png?width=500px" alt=""></img>
                    <img src="http://www.zoohackathon.com/media/1149/wcs_acronym-002.jpg?width=300px" alt=""></img>
                </div>
            </div>
            <div className="Newsletter">
                <div className="newsletter-title">
                    Subscribe to receive news
                </div>
                <div className="newsletter-text">
                    Join us to protect wildlife together!
                </div>
                <form className="newsletter-form" onSubmit={handleOnSubmit}>
                    <input type="text" value={emailInput} onChange={(event)=>setEmailInput(event.target.value)}></input>
                    <button>Subscribe</button>  
                </form>
            </div>
        </div>
    )
}