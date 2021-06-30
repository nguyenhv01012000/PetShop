import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/Product.css' 
import '../../App.css'  
import tractivedog from '../../assets/tractive-dog.jpg';
import tractivedog1 from '../../assets/tractive2.webp';
import chats from '../../assets/cat.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faShip, faUndo, faStar } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../contexts/Cart'
import ReactStars from "react-rating-stars-component";
import ProductDetail from './ProductDetail';


export default function ProductDetail1(props) {  
    const ratingStar = {
        size: 20,
        edit: false,
        activeColor: "#ff4367",
        color: "#ff4367",
        isHalf: true
    }
    // const productDog = {
    //     id: 8,
    //     productCate: "123",
    //     productColor: null,
    //     productDate: "2021-06-12T14:57:50.532417Z",
    //     productDes: "nguyen",
    //     productFeature: null,
    //     productImg: tractivedog1,
    //     productName: "Collier GPS pour chiens",
    //     productPrice: 100,
    //     productSale: 10,
    //     productSold: 0,
    //     productVote: null
    // }
    // const productCat = {
    //     id: 9,
    //     productCate: "123",
    //     productColor: null,
    //     productDate: "2021-06-12T14:57:50.532417Z",
    //     productDes: "nguyen",
    //     productFeature: null,
    //     productImg: chats,
    //     productName: "Collier GPS pour chats",
    //     productPrice: 100,
    //     productSale: 10,
    //     productSold: 0,
    //     productVote: null
    // }
    const product = props.productDetail
    console.log(product)
    const {
        addToCart,
        setOpenCartBox,
        setCloseCartBox
    } = useContext(CartContext)
    const cartClick1 = () => {
        addToCart(product)
        setOpenCartBox(true)
        setCloseCartBox(false)
    }
    return (
        <div className="ProductDetail flex">
            <div className="productdetail-image-box">
                <img src={product.productImg}></img>
            </div>
            <div className="productdetail-info">
                <h1>{product.productName}</h1>
                <h3 style={{fontWeight:"300"}}>{product.productCate}</h3>
                <div className="flex" style={{alignItems: "center"}}>
                    <ReactStars {...ratingStar} />
                    <p style={{marginLeft:"10px", fontSize:"12px", fontWeight:"600",cursor:"pointer"}}>4496 évaluations</p>
                </div>
                <ul>
                     <li> Vị trí GPS toàn cầu với theo dõi hoạt động </li>
                     <li> Chế độ TRỰC TIẾP - vị trí được cập nhật cứ sau 2 đến 3 giây </li>
                     <li> Bạn sẽ nhận được thông báo nếu con chó của bạn đi bộ hơi xa nhà bạn </li>
                     <li> Có được trải nghiệm theo dõi tốt nhất với công nghệ mới nhất </li>
                     <li> Không thấm nước 100% và có khả năng chống chọi với mọi cuộc phiêu lưu của bạn </li>
                     <li> Thời lượng pin lên đến 5 ngày </li>
                     <li> Chọn đăng ký từ € 4,17 mỗi tháng sau khi mua hàng </li>
                </ul>
                <p style={{fontSize:"15px"}}>{product.productDes}</p>
            </div>
            <div className="productdetail-addtocart flex-col">
                <ul className="productdetail-flag-info">
                    <ul className="productdetail-flag-info-list">
                        <li> <FontAwesomeIcon icon = {faCheckCircle} className = "icon" /> Bao bì không nhựa </li>
                         <li> <FontAwesomeIcon icon = {faShip} className = "icon" /> Được gửi từ U </li>
                         <li> <FontAwesomeIcon icon = {faUndo} className = "icon" /> 14 ngày để trả lại giao dịch mua </li>
                    </ul>
                    <div className="triangle"></div>
                </ul>
                <p className="productdetail-price">{product.productPrice}</p>
                <div 
                    className="productdetail-addtocart-btn"
                    onClick={cartClick1}
                >
                   Thêm vào giỏ hàng
                </div>
            </div> 
        </div>
    )
}


