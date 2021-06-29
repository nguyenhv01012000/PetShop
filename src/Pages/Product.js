import '../App.css';
import Header from '../components/Home/Header'; 
import Newsletter from '../components/Home/Newsletter';
import Footer from '../components/Home/Footer'; 
import ProductDetail from '../components/Shop/ProductDetail';
import ShopFeatures from '../components/Shop/ShopFeatures';
import ProductAsk from '../components/Shop/ProductAsk';
// import ProductRecommend from '../components/Shop/ProductRecommend';
import ProductReview from '../components/Shop/ProductReview';
import ProductNews from '../components/Shop/ProductNews';
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductForDog(props) { 

    const [product, setProduct] = useState(null)
    const [news, setNews] = useState([])
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/product`)
            .then(res => {
                for(let i in res.data) { 
                    if (res.data[i].productCate !== props.location.pathname.substr(1)) {
                        setProduct(res.data[i])
                    }
                }
            })
        axios.get(`http://localhost:8000/api/news`)
            .then(res => { 
                setNews(res.data) 
            })
        window.scrollTo(0,0)
        console.log(product)
    }, [props.location.pathname]) 
    useEffect(() => {
        axios.get(`http://localhost:8000/api/product`)
        .then(res => {
            setProducts(res.data)
        })
    },[])
    const handleClick = () => {
        smoothScroll.scrollTo('review'); 
    }
    
    var smoothScroll = {
        
        timer: null,
    
        stop: function () {
            clearTimeout(this.timer);
        },
    
        scrollTo: function (id, callback) {
            var settings = {
                duration: 1000,
                easing: {
                    outQuint: function (x, t, b, c, d) {
                        return c*((t=t/d-1)*t*t*t*t + 1) + b;
                    }
                }
            };
            var percentage;
            var startTime;
            var node = document.getElementById(id);
            var nodeTop = node.offsetTop;
            var nodeHeight = node.offsetHeight;
            var body = document.body;
            var html = document.documentElement;
            var height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            var windowHeight = window.innerHeight
            var offset = window.pageYOffset;
            var delta = nodeTop - offset;
            var bottomScrollableY = height - windowHeight;
            var targetY = (bottomScrollableY < delta) ?
                (bottomScrollableY - (height - nodeTop - nodeHeight + offset)):
                delta - 30;
    
            startTime = Date.now();
            percentage = 0;
    
            if (this.timer) {
                clearInterval(this.timer);
            }
    
            function step () {
                var yScroll;
                var elapsed = Date.now() - startTime;
    
                if (elapsed > settings.duration) {
                    clearTimeout(this.timer);
                }
    
                percentage = elapsed / settings.duration;
    
                if (percentage > 1) {
                    clearTimeout(this.timer);
    
                    if (callback) {
                        callback();
                    }
                } else {
                    yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
                    window.scrollTo(0, yScroll);
                    this.timer = setTimeout(step, 10);     
                }
            }
    
            this.timer = setTimeout(step, 10);
        }
    };
  
    return (
        <div className="ProductForDog">
            <Header/>
            {products.map((item) => {
                return(
                <ProductDetail
                animal={props.location.pathname}
                productDetail={item}
                /> 
                )           
            })}
            <ShopFeatures/>
            <ProductAsk/>
            { product &&
                <ProductReview
                    product={product}/>
            }
            {/* <ProductRecommend/> */}
            <ProductNews news={news}/>
            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default withRouter(ProductForDog);
