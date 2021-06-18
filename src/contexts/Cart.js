import React, { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const CartContext = React.createContext();

export function CartProvider(props) {
    
    const [cartItems, setCartItems] = useState([]) 
    const [clickedCart, setClickedCart] = useState(0)
    const [total, setTotal] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [openCartBox, setOpenCartBox] = useState(false)
    const [closeCartBox, setCloseCartBox] = useState(false)
    // const [room, setRoom] = useState()
    // const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${room}/`);
    // useEffect(()=>{
    //     client.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //     };
    // },[room])

    const isExists = (cartItems = [], item = {}) => {
        for (let cartItem of cartItems) {
            if (cartItem.id === item.id) {
                return cartItem;
            }
        }
        return false;
    }

    useEffect(()=>{
        if (localStorage.getItem('cart')) {
            setCartItems(JSON.parse(localStorage.getItem('cart')))
        } 
        setTotal(JSON.parse(localStorage.getItem('total')))
    }, []) 

    const addToCart = (product = {}, count) => {
        setTimeout(() => { 
            if (count) {
                setClickedCart(clickedCart + count) // scroll on click to cart
                const virtualCart = [...cartItems] 
                if (cartItems.length === 0) {
                    virtualCart.push({...product, count: count})
                } else {
                    if (!isExists(cartItems, product)) {
                        virtualCart.push({...product, count: count})
                    } else {
                        for (let i = 0; i < virtualCart.length; i++) {
                            if (virtualCart[i]._id === product._id) {
                                virtualCart[i].count += count
                                break
                            }
                        }
                    }
                }
                localStorage.setItem('cart', JSON.stringify(virtualCart))
                setCartItems(virtualCart)
                getTotal(virtualCart)
            } else {
                setClickedCart(clickedCart + 1) // scroll on click to cart
                const virtualCart = [...cartItems] 
                if (cartItems.length === 0) {
                    virtualCart.push({...product, count: 1})
                } else {
                    if (!isExists(cartItems, product)) {
                        virtualCart.push({...product, count: 1})
                    } else {
                        for (let i = 0; i < virtualCart.length; i++) {
                            if (virtualCart[i].id == product.id) {
                                virtualCart[i].count += 1
                                break
                            }
                        }
                    }
                }
                localStorage.setItem('cart', JSON.stringify(virtualCart))
                setCartItems(virtualCart)
                getTotal(virtualCart)
                gettotalCount(virtualCart)
            }
        }, 500);
    } 
    
    const removeFromCart = (event) => {
        const id = event.target.id
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].id == id) {
                virtualCart.splice(i, 1)
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
        gettotalCount(virtualCart)
    } 

    const minusCount = (event) => {
        const id = event.target.id
        console.log(id)
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].id == id) {
                if (virtualCart[i].count > 1) {
                    virtualCart[i].count = virtualCart[i].count - 1
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
        gettotalCount(virtualCart)
    }
    
    const plusCount = (event) => {
        const id = event.target.id
        
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].id == id) {
                virtualCart[i].count += 1
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
        gettotalCount(virtualCart)
    }
    const updateCount = (event) => {
        const id = event.target.id
        const value = event.target.value
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i]._id === id) {
                virtualCart[i].count = Number(value)
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
        gettotalCount(virtualCart)
    }

    const getTotal = (arr) => {
        let virtualTotal = 0
        for (let i in arr) {
            virtualTotal += arr[i].count * arr[i].productPrice
        } 
        localStorage.removeItem('total')
        localStorage.setItem('total', JSON.stringify(virtualTotal))
        setTotal(virtualTotal)
    }
    const gettotalCount = (arr) => {
        let virtualTotal = 0
        for (let i in arr) {
            virtualTotal += arr[i].count
        }
        localStorage.removeItem('totalCount')
        localStorage.setItem('totalCount', JSON.stringify(virtualTotal))
        setTotalCount(virtualTotal)
    }
    return (
        <CartContext.Provider
            value={{
                cartItems: cartItems,
                addToCart: addToCart, 
                clickedCart: clickedCart,
                removeFromCart: removeFromCart,
                plusCount: plusCount,
                minusCount: minusCount, 
                updateCount: updateCount,
                total: total,
                totalCount: totalCount,
                openCartBox: openCartBox,
                setOpenCartBox: setOpenCartBox,
                closeCartBox: closeCartBox,
                setCloseCartBox: setCloseCartBox,
                // setRoom : setRoom
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}