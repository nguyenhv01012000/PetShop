import React, { useContext, useEffect, useState } from 'react'
import '../../Styles/Home.css'
import '../../App.css' 
import ReactStars from "react-rating-stars-component";
import { UserContext } from '../../contexts/User';
import axios from 'axios'

export default function ProductReview(props) { 

    const [reviewStar, setReviewStar] = useState(0)
    const [reviewName, setReviewName] = useState("")
    const [reviewEmail, setReviewEmail] = useState("")
    const [address, setAddress] = useState("")
    const [reviewContent, setReviewContent] = useState("")
    const [productVote, setProductVote] = useState([])
    const [product, setProduct] = useState(null)
    const [limitReview, setLimitReview] = useState(3)
    const [file, setFile] = useState([])
    const [newsImg, setNewsImg] = useState([])
    const { 
        userInfo
    } = useContext(UserContext);

    // useEffect(()=>{
    //     if (userInfo) {
    //         setReviewName(userInfo.userEmail)
    //     }
    //     if (props.product) { 
    //         setProduct(props.product)
    //         const arr = props.product.productVote.sort((a,b)=> new Date(b.ratingDate) - new Date(a.ratingDate));
    //         setProductVote(arr);  
    //     }
    // },[userInfo])  

    const reviewStarConfig = {
        size: 24,
        value: reviewStar,
        activeColor: "#fc2754",
        color: "#ddd",
        isHalf: true,
        edit: true,
        onChange: newValue => {
            setReviewStar(newValue)
        }
    }

    const sendReview = (event) => {
        event.preventDefault() 
        if (userInfo) {
            const data = {
                ratingName: reviewName,
                ratingDate: new Date().toString(),
                ratingContent: reviewContent, 
                ratingStart: reviewStar,
                ratingAvt: userInfo.userAvt
            }
            axios.post(`http://127.0.0.1:8000/reviews/`, data)
            .then((res)=>{
                console.log(res)
                setProductVote(productVote=>[data, ...productVote])
                setReviewName("")
                setReviewContent("") 
                setAddress("")
                setFile("")
            })
        } else {
            const formData = new FormData();
            const imageArr = Array.from(file);
            imageArr.forEach(image => {
                formData.append('image', image);
            });

            formData.append("name", reviewName);
            formData.append("email", reviewEmail);
            formData.append("review", reviewContent);
            formData.append("address", address);  

            const data = {
                name: reviewName,
                email:reviewEmail,
                review: reviewContent, 
                address: address, 
                image: file,
                ratingDate: new Date().toString(),
            }
            axios.post(`http://127.0.0.1:8000/reviews/`, formData)
            .then((res)=>{ 
                setProductVote(productVote=>[data, ...productVote])
                setReviewName("")
                setReviewEmail("")
                setReviewContent("") 
                setReviewContent("") 
                setAddress("")
                alert(res.data)
            })
        }
    }  
    const deleteImg = (event) => {
        const virutalFile = [...file]
        virutalFile.splice(event.target.id, 1)
        setFile(virutalFile)

        const items = [...newsImg]
        items.splice(event.target.id, 1)
        setNewsImg(items)
    }
    return (
        <div className="ProductReview" id="review" >
            <div className="invitejoin">
                <div className="invitejoin-title" style={{marginTop:"50px"}}>
                    <strong>Wildlife Crime Report</strong>
                </div>
                <div className="productreview-list flex-col">
                    {
                        productVote && 
                        productVote.slice(0,limitReview).map((item, index) => {  
                            const ratingStar = {
                                size: 14,
                                value: item.ratingStart,
                                edit: false,
                                activeColor: "#fc2754",
                                color: "#ddd",
                                isHalf: true
                            }
                            const date = new Date(item.ratingDate)
                            const day = date.getDate()
                            const month = date.getMonth() + 1
                            const year = date.getFullYear()
                            return (
                                <div 
                                    key={index}
                                    className="productreview-item flex"
                                > 
                                    <img className="productreview-avt" src={item.ratingAvt || "https://icon-library.com/images/avatar-icon-png/avatar-icon-png-8.jpg"} alt=""></img>
                                    <div className="productreview-body flex-col">
                                        <div className="productreview-first flex">
                                            <div className="productreview-name">
                                                {item.ratingName}
                                            </div>
                                            <div className="productreview-time">
                                                {`${day}/${month}/${year}`}
                                            </div>
                                        </div>
                                        <div className="productreview-second">
                                            <div className="productreview-star" style={{color:"red"}}>
                                                {/* <ReactStars {...ratingStar} /> */}
                                                Report
                                            </div>
                                            <div className="productreview-content">
                                                {item.ratingContent}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* {
                    productVote.length > 3 && productVote.length !== productVote.slice(0,limitReview).length &&
                    <div className="flex-center">
                        <div 
                            onClick={()=>{
                                setLimitReview(limitReview=>limitReview+3)
                            }}
                            className="productreview-loadmore-btn"
                        >load more...</div>
                    </div>
                } */}
                <div className="productreview-post flex-center">
                    <div className="productreview-post-box">
                        <h3>Report observations of live wildlife, dead wildlife, or sick or injured wildlife:</h3>
                        {/* <ReactStars {...reviewStarConfig}/> */}
                        <form className="flex-col" onSubmit={sendReview}>
                            <label>Name</label>
                            <input 
                                value={reviewName}
                                onChange={(event)=>{
                                    setReviewName(event.target.value)
                                }}
                            ></input>
                            <label>Email</label>
                            <input 
                                value={reviewEmail}
                                onChange={(event)=>{
                                    setReviewEmail(event.target.value)
                                }}
                            ></input>
                         <div className="create-box-row flex">
                         <label>Images</label>
                        {/* <div className="dashboard-left flex">Images </div> */}
                        <div className="dashboard-right">
                            <input 
                                onChange={(event) => {
                                    const files = event.target.files;
                                    for (let i = 0; i< files.length; i++) {
                                        setNewsImg(news=>[...news, URL.createObjectURL(files[i])])
                                    }
                                    const fileArr = Array.prototype.slice.call(files)
                                    fileArr.forEach(item=>{
                                        
                                        setFile(file=>[...file, item])
                                    })
                                }}
                                type="file"
                                name="newsImg"
                                className="noborder"
                                multiple="multiple"
                                style={{height: '50px'}}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                { newsImg && 
                                    newsImg.map((item, index) => {
                                        return (
                                            <div key={index} className="create-box-img">
                                                <img key={index} src={item} alt=""></img>
                                                <div 
                                                    className="create-box-img-overlay"
                                                >
                                                    <p
                                                        id={index}
                                                        onClick={deleteImg}
                                                        className="icon">X
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                            <label>Address</label>
                            <input 
                                value={address}
                                onChange={(event)=>{
                                    setAddress(event.target.value)
                                }}
                            ></input>
                            <label>Description</label>
                            <input 
                                value={reviewContent}
                                onChange={(event)=>{
                                    setReviewContent(event.target.value)
                                }}
                            ></input>
                            <button>Report</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}