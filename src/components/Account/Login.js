import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import '../../App.css'
import { CartContext } from '../../contexts/Cart';
import '../../Styles/Login.css'
import { EyeOff, Eye} from 'react-feather'
import { useTranslation } from 'react-i18next';

function Login(props) {
    const { t, i18n } = useTranslation();
    const { 
        textLanguge
    } = useContext(CartContext);    
    i18n.changeLanguage(textLanguge);
    
    const [tab, setTab] = useState(0)
    const [email, setEmail] = useState("") 
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [arrSuccess, setArrSuccess] = useState()
    const [arrErr, setArrErr] = useState() 

    // useEffect(()=> {
    //     Axios.get(`http://pe.heromc.net:4000/users/${localStorage.getItem('user-id')}`, { 
    //         headers: {"authorization" : `Bearer ${localStorage.getItem('token')}`}
    //     })
    //     .then(res => { 
    //         setUserInfoFunc(res.data.user);
    //         props.history.push("/account")
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // },[a]) 

    const sendAccount = (event) => {
        event.preventDefault()
        if (tab === 0) {
            Axios.post('http://localhost:8000/api/login/', {
                username: email,
                password: values.password
            }) 
            .then(res => {
                setArrSuccess("Đăng nhập thành công!") 
                setArrErr("");
                // setTimeout(()=> {
                //     window.location.reload(false);
                //     document.body.style.overflow = 'unset';
                // }, 1000)
                props.history.push('')
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user-id', res.data.user.id);
            })
            .catch(err => {
                setArrSuccess("");
                setArrErr("Tên đăng nhập hoặc mật khẩu không chính xác");
            })
        } else {
            Axios.post('http://localhost:8000/api/register/', {
                username: name,
                email: email,
                password: values.password,
                //userRole: "user"
            })
            .then(res => { 
                setArrSuccess("Đăng ký thành công!")
                setArrErr("");
                setTimeout(()=> {
                    window.location.reload(false);
                    document.body.style.overflow = 'unset';
                }, 1000)
            })
            .catch(err => { 
                setArrSuccess("");
                setArrErr(err.response.data.username);
            })
        }
    }
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });
      const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    return (
        <div className="login flex-col">
            <div className="login-title">
                <strong>{t('title1')}</strong> {t('title2')}
            </div>
            <div className="login-banner"> 
            </div>
            { tab === 0 &&
                <div className="login-box flex-col">
                    <div className="login-box-title"><strong>{t('signin')}</strong></div>
                    <div className="login-status">
                        { arrErr && <div className="login-err">{arrErr}</div>}
                        { arrSuccess && <div className="login-success">{arrSuccess}</div>}
                    </div>
                    <form className="flex-col" onSubmit={sendAccount}>
                        <label>{t('username')}</label>
                        <input
                            value={email}
                            onChange={(event)=>{
                                setEmail(event.target.value)
                            }}
                        ></input>
                        <label>{t('password')}</label>
                        <div className="input-password">
                            <input
                                type={isRevealPwd ? "text" : "password"}                      
                                value={values.password}
                                onChange={handlePasswordChange("password")}
                            />
                            <span  onClick={() => setIsRevealPwd(!isRevealPwd)}>{isRevealPwd ?<Eye size={15}/> :<EyeOff size={15}/> }</span>
                        </div>

                        <button>{t('signin')}</button>
                    </form>
                    <div className="login-forgot">{t('forgotPassword')}</div>
                    <div className="login-register" onClick={()=>{setTab(1)}}>{t('createAccount')}</div>
                </div>
            }
            { tab === 1 &&
                <div className="login-box flex-col">
                    <div className="login-box-title"><strong>{t('signup')}</strong></div>
                    <div className="login-status">
                        { arrErr && <div className="login-err">{arrErr}</div>}
                        { arrSuccess && <div className="login-success">{arrSuccess}</div>}
                    </div>
                    <form className="flex-col" onSubmit={sendAccount}>
                        <label>{t('username')}*</label>
                        <input
                            value={name}
                            onChange={(event)=>{
                                setName(event.target.value)
                            }}
                        ></input>
                        <label>{t('signin')}*</label>
                        <input
                            value={email}
                            onChange={(event)=>{
                                setEmail(event.target.value)
                            }}
                        ></input>
                        <label>{t('forgotPassword')} *</label>
                        <div className="input-password">
                            <input
                                type={isRevealPwd ? "text" : "password"}                      
                                value={values.password}
                                onChange={handlePasswordChange("password")}
                            />
                            <span  onClick={() => setIsRevealPwd(!isRevealPwd)}>{isRevealPwd ?<Eye size={15}/> :<EyeOff size={15}/> }</span>
                        </div>
                        <button>{t('createAccount')}</button>
                    </form> 
                    <div className="login-register" onClick={()=>{setTab(0)}}>{t('hasAccount')}</div>
                </div>
            }
        </div>
    )
}
export default withRouter(Login)