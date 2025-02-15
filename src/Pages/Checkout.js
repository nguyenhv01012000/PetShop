import '../App.css'; 
import '../Styles/Checkout.css'
import { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { UserContext } from '../contexts/User';
import Axios from 'axios';
import { CartContext } from '../contexts/Cart';
import { ZaloPay } from '../components/zalopay';
import QRCode from 'qrcode.react'
import { APIs } from '../components/common';
import $ from 'jquery';  
// import socketIOClient from "socket.io-client"

// const ENDPOINT = "http://localhost:4000";
 
function Checkout(props) {

    const { 
        setUserInfoFunc
    } = useContext(UserContext);

    const { 
        cartItems,
        total
    } = useContext(CartContext);
    //const socket = socketIOClient(ENDPOINT)

    const [tinh, setTinh] = useState([])
    const [huyen, setHuyen] = useState([])

    const [userName, setUserName] = useState("")
    const [_id, set_Id] = useState("")
    const [userAvt, setUserAvt] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userProvince, setUserProvince] = useState("")
    const [userDistrict, setUserDistrict] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [provinceId, setProvinceId] = useState("")
    const [checkoutTab, setCheckoutTab] = useState(0)
    const [shipping, setShipping] = useState(".0")
    // const [orderPaymentMethod, setOrderPaymentMethod] = useState("")
    // const [orderAddressConfirm, setOrderAddressConfirm] = useState("")
    const [isShowQR, setIsShowQR] = useState(false)
    const [qrValue, setQRValue] = useState("")
    const [isPaid, setIsPaid] = useState(false) 

    useEffect(()=>{
        window.scrollTo(0,0)  
        Axios.get(`http://localhost:4000/users/${localStorage.getItem('user-id')}`, { 
            headers: {"authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res => {  
            setUserInfoFunc(res.data.user);
            const userInfo = res.data.user
            set_Id(userInfo._id)
            setUserName(userInfo.userName)
            setUserAvt(userInfo.userAvt)
            setUserPhone(userInfo.userPhone)
            setUserEmail(userInfo.userEmail)
            setUserProvince(userInfo.userTinh) 
            setUserAddress(userInfo.userAddress) 
            if (userInfo.userDistrict !== "") {
                Axios.get(`http://localhost:4000/vietnam`)
                    .then(res => {
                        setTinh(res.data[0].tinh)
                        setHuyen(res.data[0].huyen)
                        res.data[0].tinh.filter((item)=>{ 
                            if (userInfo.userTinh === item.name) {
                                setProvinceId(item.id)
                            }
                            return null
                        })
                    }
                )  
                setUserProvince(userInfo.userTinh)
            }
            if (userInfo.userHuyen !== "") {
                setUserDistrict(userInfo.userHuyen)
            } 
        })
        Axios.get(`http://pe.heromc.net:4000/vietnam`)
        .then(res => {
            setTinh(res.data[0].tinh)
            setHuyen(res.data[0].huyen)
        })
    },[])  

    const [methodPayment, setMethodPayMent] = useState(0)

    const checkedPayMent = (event) => {
        setMethodPayMent(Number(event.target.id))
    } 

    const showQR = (text) => {
        setIsShowQR(true) 
        setQRValue(text)
    } 

    const placeAnOrder = () => {
        let orderPaymentMethod2 = "";
        if (methodPayment === 1) {
            orderPaymentMethod2 = "thanh toan khi nhan hang"
        } else if (methodPayment === 2) {
            orderPaymentMethod2 = "zalopay"
        } else {
            orderPaymentMethod2 = ""
        }

        var cartId = []
        for (let i in cartItems) {
            cartId.push(
                {
                    id: cartItems[i].id,
                    amount: cartItems[i].count 
                }
            )
        } 
        const data = {
            orderName: userName,
            orderAvatar: userAvt,
            orderEmail: userEmail,
            orderPhone: userPhone,
            orderAddress: userAddress,
            orderTinh: userProvince,
            orderHuyen: userDistrict,
            orderList: cartId,
            orderTotal: total,
            orderPaymentMethod: orderPaymentMethod2,
            orderDate: new Date()
        }
  
        if (orderPaymentMethod2 === "") {
            alert("Hãy chọn phương thức thanh toán")
            return
        } else if (orderPaymentMethod2 === "zalopay") {
            if (isPaid === false) {
                alert("Bạn chưa hoàn tất thanh toán!")
                return
            } else {
                Axios.post('http://localhost:8000/api/order', data)
                setTimeout(()=>{ 
                    alert("Đặt hàng thành công!")
                    localStorage.removeItem('total')
                    localStorage.removeItem('cart')  
                    props.history.push("/")
                    //socket.emit('placeAnOrder', data)
                    window.location.reload(false); 
                }, 1000)
            }
        } else {
            Axios.post('http://localhost:8000/api/order', data)
            setTimeout(()=>{ 
                alert("Đặt hàng thành công!")
                localStorage.removeItem('total')
                localStorage.removeItem('cart')  
                props.history.push("/")
                //socket.emit('placeAnOrder', data)
                window.location.reload(false); 
            }, 1000)
        } 
    } 

    return (
        <div className="Home">
            <div className="Header flex">  
                <Link to="/" className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" viewBox="0 34 300 84" fill="#007fc8">
                        <path d="M88.62 57.88l8.5-1.37v8.85h10.2v7.08h-10.2v10.57a8.42 8.42 0 00.93 4.28q.95 1.6 3.8 1.6a16.19 16.19 0 002.82-.26 14.52 14.52 0 002.65-.71l1.2 6.62a24.17 24.17 0 01-3.42 1.08 19.94 19.94 0 01-4.62.46 15.18 15.18 0 01-5.76-.94 9.03 9.03 0 01-3.65-2.63 9.78 9.78 0 01-1.9-4.08 24.11 24.11 0 01-.55-5.31zm44.25 15.02q-1.14-.28-2.68-.6a16.59 16.59 0 00-3.31-.31 15.44 15.44 0 00-1.91.14 11.29 11.29 0 00-1.68.31V95.4h-8.5V66.96a51.03 51.03 0 015.39-1.51 31 31 0 016.92-.72q.69 0 1.66.09t1.94.23q.97.14 1.94.34a9.2 9.2 0 011.65.48zm16.76-8.34a19.65 19.65 0 016.27.86 9.74 9.74 0 014.02 2.45 9.04 9.04 0 012.14 3.89 19.18 19.18 0 01.63 5.08v17.7q-1.83.4-5.08.94a48.76 48.76 0 01-7.86.54 24.91 24.91 0 01-5.28-.51 11.43 11.43 0 01-4.08-1.69 7.7 7.7 0 01-2.62-3.05 10.55 10.55 0 01-.91-4.63 8.77 8.77 0 011.05-4.45 8.13 8.13 0 012.83-2.91 12.76 12.76 0 014.04-1.57 22.74 22.74 0 014.74-.49 27.15 27.15 0 012.94.14 13.22 13.22 0 012.08.38v-.8a4.71 4.71 0 00-1.31-3.49q-1.32-1.31-4.57-1.31a29.08 29.08 0 00-4.27.31 18.4 18.4 0 00-3.65.89l-1.09-6.85q.74-.23 1.86-.49t2.42-.46q1.31-.2 2.77-.34t2.93-.14m.69 24.9q1.25 0 2.4-.06a16.32 16.32 0 001.82-.17v-6.45q-.51-.12-1.54-.23a17.37 17.37 0 00-1.88-.12 16.9 16.9 0 00-2.25.15 5.9 5.9 0 00-1.85.54 3.18 3.18 0 00-1.26 1.08 3.02 3.02 0 00-.46 1.72 2.92 2.92 0 001.34 2.77 7.4 7.4 0 003.68.77m19.16-9.08a17.73 17.73 0 011.05-6.14 14.36 14.36 0 017.9-8.42 15.98 15.98 0 016.5-1.26 20.92 20.92 0 014.4.43 21.35 21.35 0 013.87 1.23l-1.77 6.8a21.43 21.43 0 00-2.62-.8 13.68 13.68 0 00-3.2-.35 6.73 6.73 0 00-5.61 2.34 9.65 9.65 0 00-1.85 6.17 9.99 9.99 0 001.74 6.28q1.73 2.23 6.07 2.23a20.78 20.78 0 003.3-.29 14.02 14.02 0 003.26-.91l1.2 6.97a19.94 19.94 0 01-3.72 1.08 24.44 24.44 0 01-4.9.46 18.44 18.44 0 01-7.07-1.23 13.3 13.3 0 01-4.88-3.34 13.01 13.01 0 01-2.79-5 21.2 21.2 0 01-.88-6.26m30.22-22.49l8.5-1.37v8.85h10.2v7.08h-10.2v10.57a8.42 8.42 0 00.93 4.28q.95 1.6 3.8 1.6a16.19 16.19 0 002.82-.26 14.52 14.52 0 002.65-.71l1.2 6.62a24.19 24.19 0 01-3.42 1.08 19.94 19.94 0 01-4.62.46 15.19 15.19 0 01-5.76-.94 9.03 9.03 0 01-3.65-2.63 9.78 9.78 0 01-1.9-4.08 24.1 24.1 0 01-.55-5.31zm35.47-1.2a4.67 4.67 0 01-1.52 3.69 5.4 5.4 0 01-7.12 0 5.24 5.24 0 010-7.37 5.4 5.4 0 017.12 0 4.68 4.68 0 011.52 3.68m-.8 38.72h-8.5V65.36h8.5zm15.9 0q-2.93-5.71-5.93-13.36t-5.7-16.68h9.01q.57 2.23 1.35 4.83t1.6 5.25q.83 2.66 1.66 5.17t1.63 4.57q.75-2.06 1.6-4.57t1.7-5.17q.82-2.65 1.6-5.25t1.34-4.83h8.79q-2.7 9.03-5.7 16.68t-5.9 13.36zm21.56-14.8a18.38 18.38 0 011.23-6.99 15.01 15.01 0 013.22-5 13.4 13.4 0 014.59-3.02 14.36 14.36 0 015.33-1.03q6.39 0 10.1 3.91t3.7 11.5q0 .75-.06 1.64t-.11 1.57h-19.27a5.65 5.65 0 002.45 4.16 9.84 9.84 0 005.81 1.55 24.53 24.53 0 004.6-.43 17.29 17.29 0 003.67-1.06l1.14 6.91a11.78 11.78 0 01-1.82.69 23.98 23.98 0 01-2.54.6q-1.4.25-3 .42a30.03 30.03 0 01-3.19.18 18.89 18.89 0 01-7.04-1.2 13.72 13.72 0 01-4.96-3.28 13.04 13.04 0 01-2.9-4.94 19.58 19.58 0 01-.95-6.17m19.96-3.26a8.83 8.83 0 00-.37-2.1 5.3 5.3 0 00-.97-1.83 5.18 5.18 0 00-1.66-1.32 5.39 5.39 0 00-2.48-.51 5.7 5.7 0 00-2.45.48 5.06 5.06 0 00-1.7 1.29 5.76 5.76 0 00-1.06 1.85 12.14 12.14 0 00-.55 2.15zM47.9 77.8c-.78-1.92-3.55-2.42-4.87-3.75-2.75-2.77-2.1-7.31-6.83-7.58-4.74.27-4.08 4.81-6.83 7.58-1.32 1.33-4.09 1.83-4.87 3.75-.96 2.36.62 4.5 1.8 5.42 2.4 1.84 6.25.02 8.82-.25a11.96 11.96 0 012.16 0c2.58.27 6.42 2.09 8.81.24 1.19-.91 2.77-3.05 1.81-5.41m2.28-10.42c-.62 2.35-2.54 3.86-4.3 3.4s-2.64-2.76-2.02-5.1 2.54-3.87 4.29-3.4 2.65 2.76 2.03 5.1m-21.64-1.7c.62 2.34-.29 4.63-2.03 5.1s-3.67-1.05-4.3-3.4.29-4.62 2.04-5.1 3.66 1.05 4.29 3.4M35 58.97c.62 2.34-.29 4.62-2.04 5.09S29.3 63 28.68 60.67s.28-4.62 2.03-5.1 3.66 1.05 4.29 3.4m8.72 1.7c-.62 2.34-2.54 3.86-4.29 3.39s-2.65-2.75-2.03-5.1 2.54-3.85 4.29-3.38 2.66 2.75 2.03 5.1"></path>
                        <path d="M36.2 34.37A36.2 36.2 0 000 70.57c0 19.3 16.89 31.37 16.9 31.37l19.3 15.69 19.3-15.69s16.9-12.07 16.9-31.37a36.2 36.2 0 00-36.2-36.2m0 60.33a24.13 24.13 0 1124.13-24.13A24.13 24.13 0 0136.2 94.7"></path>
                    </svg>
                </Link> 
            </div>
            <div className="checkout-body flex">
                <div className="checkout-fill">
                    <div className="checkout-tab flex">
                        <div 
                            className={checkoutTab === 0 ? "checkout-tab-item checkout-tab-item-active" : "checkout-tab-item"}
                            onClick={()=>{
                                setCheckoutTab(0)
                            }}
                        >1. Thông tin giao hàng</div>
                        <div 
                            className={checkoutTab === 1 ? "checkout-tab-item checkout-tab-item-active" : "checkout-tab-item"}
                            onClick={()=>{
                                setCheckoutTab(1)
                            }}
                        >2. Thanh toán</div>
                    </div>
                    {
                        checkoutTab === 0 &&
                        <div className="checkout-info">
                            <div className="checkout-info-title"><strong>Địa chỉ</strong> giao hàng</div>
                            <form className="checkout-info-form">  
                                <div className="checkout-info-row">
                                    <div className="checkout-info-left">Họ tên</div>
                                    <input 
                                        type="text"
                                        className="input" 
                                        value={userName}
                                        onChange={(event)=>{
                                            setUserName(event.target.value)
                                        }}
                                    ></input>
                                </div>
                                <div className="checkout-info-row">
                                    <div className="checkout-info-left">Số điện thoại</div>
                                    <input 
                                        type="text"
                                        className="input" 
                                        value={userPhone}
                                        onChange={(event)=>{
                                            setUserPhone(event.target.value)
                                        }}
                                    ></input>
                                </div>
                                <div className="checkout-info-row">
                                    <div className="checkout-info-left">Email</div>
                                    <input 
                                        type="text"
                                        className="input" 
                                        value={userEmail}
                                        onChange={(event)=>{
                                            setUserEmail(event.target.value)
                                        }}
                                    ></input>
                                </div>
                                {/* <div className="checkout-info-row">
                                    <div className="checkout-info-left">Tỉnh</div> 
                                    <select 
                                        className="input"
                                        value={userProvince || ''}
                                        onChange={(event)=>{
                                            setProvinceId(event.target.selectedIndex)
                                            setUserProvince(event.target.value)
                                        }}
                                    >
                                        <option disabled>select a province</option>
                                        {tinh.map((item, index) => {
                                            return (
                                                <option 
                                                    key={index}
                                                    value={item.name}
                                                >{item.name}</option>
                                            )
                                        })}
                                    </select> 
                                </div>
                                <div className="checkout-info-row">
                                    <div className="checkout-info-left">Huyện</div> 
                                    <select 
                                        className="input"
                                        value={userDistrict || ''}
                                        onChange={(event)=>{
                                            setUserDistrict(event.target.value)
                                        }}
                                    >
                                        <option disabled>select a district</option>
                                        {huyen.map((item, index) => {
                                            if (item.tinh_id === provinceId) {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.name}
                                                        >{item.name}</option>
                                                )
                                            }
                                            return null
                                        })}
                                    </select> 
                                </div> */}
                                <div className="checkout-info-row">
                                    <div className="checkout-info-left">Địa chỉ</div>
                                    <input 
                                        type="text"
                                        className="input"
                                        name="address" 
                                        value={userAddress || ''}
                                        onChange={(event)=>{
                                            setUserAddress(event.target.value)
                                        }}
                                    ></input>
                                </div>  
                                <div 
                                    className="checkout-info-row flex-center"
                                    onClick={()=>{
                                        setCheckoutTab(1)
                                        if (window.innerWidth >= 750) {
                                            window.scrollTo(0,0)
                                        }
                                    }}
                                >
                                    <div className="checkout-info-btn">Tiếp theo</div>
                                </div>           
                            </form>
                        </div>
                    }
                    {
                        checkoutTab === 1 &&
                        <div className="checkout-info">
                            <div className="checkout-info-title"><strong>Phương thức</strong> thanh toán</div>
                            <div className="checkout-detail-ship-item flex"> 
                                <input 
                                    type="radio" id="1" name="ship" className="payment-method"
                                    onChange={checkedPayMent}
                                    onClick={()=>{
                                        setIsShowQR(false) 
                                    }}
                                ></input>
                                <label 
                                    htmlFor="1" className="payment-method-label"
                                >
                                    <img src="http://inoxcongsang.com/wp-content/uploads/2018/03/thanh-toan-khi-nhan-hang.jpg" alt=""></img>
                                    Thanh toán khi nhận hàng
                                </label> 
                            </div>
                            {/* <div 
                                className="checkout-detail-ship-item flex"
                            > 
                                <input 
                                    type="radio" id="2" name="ship" className="payment-method"
                                    onChange={checkedPayMent}
                                    onClick={()=>{  
                                        const description = `Thanh toan don hang #${_id}` 
                                        let order = {
                                            description: description,
                                            amount: total
                                        }  
                                        ZaloPay.qr(order, res => { 
                                            showQR(res.orderurl); 
                                            const check = setInterval(()=>{  
                                                $.getJSON(APIs.GETORDERSTATUS +'?morderid='+ res.apptransid)
                                                    .done(res => {  
                                                        if (res.returncode === 1) { 
                                                            setIsPaid(true)
                                                            clearInterval(check)
                                                        }
                                                    }
                                                ) 
                                            }, 1000)  
                                        }); 
                                    }}
                                ></input>
                                <label htmlFor="2" className="payment-method-label">
                                    <img src="https://stccbo.zalopay.vn/zalopay-public/websites/ver201022/images/logozlp1.png" alt=""></img>
                                    ZaloPay
                                </label>
                            </div>  */}
                            <div className={isShowQR ? "qr-box flex-col" : "d-none"}> 
                                <div className="qr-code-box flex-center">
                                    <QRCode value={qrValue}></QRCode> 
                                </div> 
                                { !isPaid &&
                                    <div className="qr-status" style={{color: "red"}}>
                                        Đang chờ thanh toán...
                                    </div>
                                }
                                { isPaid &&
                                    <div className="qr-status">
                                        Thanh toán thành công!
                                    </div>
                                }
                                { !isPaid && 
                                    <div className="qr-help">
                                        <div className="qr-help-title">Hướng dẫn thanh toán</div>
                                        <ul className="qr-help-list">
                                            <li><span>Bước 1:</span><strong> Mở</strong> ứng dụng <strong>ZaloPay</strong></li>
                                            <li><span>Bước 2:</span> Chọn <strong>"Thanh Toán"</strong> và quét mã QR</li>
                                            <li><span>Bước 3:</span> <strong> Xác nhận thanh toán</strong> ở trong ứng dụng</li>
                                        </ul>
                                    </div>
                                }
                            </div> 
                            <div 
                                className="checkout-info-row flex-center"
                                onClick={placeAnOrder}
                            >
                                <div className="checkout-info-btn">Đặt hàng</div>
                            </div>  
                        </div>
                    }
                </div>
                <div className="checkout-detail">
                    <div className="checkout-info-title"><strong>Thông tin</strong> đơn hàng</div>
                    <div className="checkout-detail-items">
                        <div className="checkout-detail-title">Sản phẩm</div>
                        { cartItems&&
                            cartItems.map((item, index) => {
                                return (
                                    <div key={index} className="checkout-detail-item flex">
                                        <p>{item.productName}</p>
                                        <p>x{item.count}</p>
                                        <p>{item.productPrice * item.count} đ</p>
                                    </div>
                                )
                            })
                        }
                        <div className="checkout-detail-title">Hình thức vận chuyển</div>
                        <form className="checkout-detail-ship"> 
                            <div className="checkout-detail-ship-item flex"> 
                                <input 
                                    type="radio" id="ghtk" name="ship" value="ghtk.20000"  
                                    onChange={(event)=>{ setShipping(event.target.value) }}
                                ></input>
                                <label htmlFor="ghtk">
                                    <p>Giao Hàng Tiết Kiệm</p>
                                    <p>20000 đ</p>
                                </label> 
                            </div>
                            <div className="checkout-detail-ship-item flex"> 
                                <input 
                                    type="radio" id="vnp" name="ship" value="vnp.22000"
                                    onChange={(event)=>{ setShipping(event.target.value) }}
                                ></input>
                                <label htmlFor="vnp">
                                    <p>VNPost Nhanh</p>
                                    <p>22000 đ</p>
                                </label>
                            </div>
                        </form>  
                    </div>
                    <div className="checkout-detail-title flex" style={{justifyContent: 'space-between'}}>
                        <p>Tổng đơn hàng</p> 
                        <p>{total + Number(shipping.split(".")[1])} đ</p> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Checkout);
