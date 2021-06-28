import React, { useRef } from 'react'
import '../../../../App.css'
import '../../../../Styles/Dashboard.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ToggleSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'
import chatbot from '../../../../assets/chatbot.jpg';

var client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/33/')


export default function DashboardInbox(props) {

    const [allChatData, setAllChatData] = useState([])
    const [room, setRoom] = useState([]);
    const [constAllChatData, setConstAllChatData] = useState([])
    const [roomIndex, setRoomIndex] = useState(0)
    const [chatInput, setChatInput] = useState("")
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/chat/?username=admin`)
            .then(res => {
                setRoom(res.data)
            })
    }, [])

    useEffect(() => {

        client.close()
        client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${roomIndex}/`)
        // client.readyState

        client.onopen = function (event) {
            client.send(JSON.stringify({
                command: "fetch_messages",
                username: "admin",
                chatId: roomIndex
            }))

            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log('got reply! ', dataFromServer);
                if (dataFromServer.command === "messages") {
                    setAllChatData([])
                    dataFromServer.messages.map(item => {
                        setAllChatData(allChatData => [...allChatData, item])
                    })
                    if (dataFromServer.messages.length > 0 && messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" })
                }
                else {
                    setAllChatData(allChatData => [...allChatData, dataFromServer.message])
                    setTimeout(() => {
                        if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" })
                    }, 100)

                }
            }
        }
    }, [roomIndex])

    const handleOnChange = (event) => {
        setChatInput(event.target.value)
    }

    const sendChatInput = (event) => {
        event.preventDefault();
        setChatInput("")
        if (chatInput === "") {
            return
        }

        client.send(JSON.stringify({
            command: "fetch_messages",
            username: "admin",
            chatId: roomIndex
        }))

        client.send(JSON.stringify({
            command: "new_message",
            from: "admin",
            message: chatInput,
            chatId: roomIndex
        }));
    }

    const messageRef = useRef([]);

    const filterOnSearch = (value) => {
        const search = []
        for (let i in constAllChatData) {
            if ((constAllChatData[i].chatName).toLowerCase().includes(value)) {
                search.push(constAllChatData[i])
            }
        }
        setAllChatData(search)
    }

    const sortDateChat = [...allChatData]

    const [openTimeTooltip, setOpenTimeTooltip] = useState("")

    const [checked, setChecked] = useState(false)
    return (
        <div className="boxchat-admin flex">
            {window.innerWidth > 800 &&
                <div className="boxchat-left">
                        <label style={{display:"flex", justifyContent:"space-between"}}                        >
                            <img src={chatbot} style={{width:"80px", height:"80px"}}></img>
                            <span style={{marginTop:"30px", paddingRight:"40px"}}>
                                <ToggleSwitch checked={checked} onChange={(e) => {
                                    setChecked(e) 
                                    
                                }} />
                            </span>
                             
                        </label><hr/>
                        {/* <input
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(event) => {
                            setSearchInput(event.target.value)
                            filterOnSearch(event.target.value)
                        }}
                    ></input> */}
                    <div className="boxchat-list">
                        {room.length > 0 &&
                            room.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={roomIndex === item.id ? "boxchat-item flex boxchat-item-active" : "boxchat-item flex"}
                                        onClick={() => {
                                            setRoomIndex(item.id)
                                        }}
                                    >
                                        <div className="boxchat-avt flex-center" style={{ pointerEvents: 'none' }}>
                                            {item.userInfo &&
                                                <img
                                                    src={item.userInfo.userAvt}
                                                    alt=""
                                                ></img>
                                            }
                                            {!item.userInfo &&
                                                <img
                                                    src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-8.jpg"
                                                    alt=""
                                                ></img>
                                            }
                                        </div>
                                        <div className="flex-col" style={{ pointerEvents: 'none', width: '100%', justifyContent: 'space-between' }}>
                                            <p className="boxchat-name">Room Chat : {item.id}</p>
                                            <div className="boxchat-first flex">

                                                Messages : {item.messages.length}

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <div className="boxchat-main">
                <div className="boxchat-box">
                    <div
                        className="boxchat-contents"
                    >
                        {/* { (sortDateChat.length>0 && window.innerWidth > 700)&& */
                            <div
                                className="flex-col chat-box-list">
                                {
                                    allChatData.map((item, index) => {
                                        return (
                                            <div
                                                ref={messageRef}
                                                key={index}
                                                className="chat-list">
                                                {
                                                    item.author === "admin" &&
                                                    <div className="box-chat-clienttext"
                                                        onMouseEnter={() => {
                                                            setOpenTimeTooltip(item.time)
                                                        }}
                                                        onMouseLeave={() => {
                                                            setOpenTimeTooltip("")
                                                        }}
                                                    >
                                                        <p>{item.content}</p>
                                                    </div>
                                                }
                                                {
                                                    item.author !== "admin" &&
                                                    <div className="box-chat-admintext"
                                                        onMouseEnter={() => {
                                                            setOpenTimeTooltip(item.time)
                                                        }}
                                                        onMouseLeave={() => {
                                                            setOpenTimeTooltip("")
                                                        }}
                                                    >
                                                        <p style={{ pointerEvents: 'none' }}>{item.content}</p>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="boxchat-type">
                    <form onSubmit={sendChatInput} className="boxchat-type-form">
                        <input
                            type="text"
                            onChange={handleOnChange}
                            value={chatInput}
                            placeholder="Type your message..."
                        ></input>
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}