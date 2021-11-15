import React from 'react'
import '../../Styles/Home.css'
import '../../App.css' 

export default function ProductAsk() { 
    return (
        <div className="ProductAsk">
            <div className="invitejoin">
                <div className="invitejoin-title">
                    <strong>FAQS</strong>
                </div>
                <div className="ask-content flex">
                    <div className="ask-list">
                        <div className="ask-item">
                            <div className="ask-title">What type of rewards will we be given ?</div>
                            <div className="ask-text">We have special handmade items to apprieciate your help and your concerns.</div>
                        </div>
                        <div className="ask-item">
                            <div className="ask-title">How do we know they’re endangered animals?</div>
                            <div className="ask-text">You can use the botchat to get more information about the animal. </div>
                        </div>
                    </div>
                    <div className="ask-list">
                        <div className="ask-item">
                            <div className="ask-title">How can i get the reward </div>
                            <div className="ask-text">We have a networks of wildlife organization around the world so you can go to all their locations to get reward </div>
                        </div>
                        <div className="ask-item">
                            <div className="ask-title">How  the credit systems works?</div>
                            <div className="ask-text">If you are log in as an user, for every correct report, your will receive one star and you can echange your stars with a rewards.</div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}