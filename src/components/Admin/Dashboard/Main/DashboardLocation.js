import React, { useEffect, useState } from 'react'
import '../../../../App.css'
import '../../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardLocation(props) {

    const [mapLink, setMapLink] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7864461.264475001!2d101.40211313069803!3d15.747489902550805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1636869986985!5m2!1svi!2s");
    const report = props.report
    console.log(report)

    const [location, setLocation] = useState("Hà Nội")

    // useEffect(()=>{
    //     axios.get(`http://localhost:4000/vietnam`)
    //         .then(res => {
    //             setLocation(res.data[0].tinh)
    //         }
    //     )
    // },[])

    const tinh = Object.values(report.reduce((a, {orderTinh}) => {
        a[orderTinh] = a[orderTinh] || {orderTinh, count: 0};
        a[orderTinh].count++;
        return a;
    }, Object.create(null)));
    var total = 0;
    for (let i in tinh) {
        total += tinh[i].count
    }
    tinh.sort((a,b) =>  b.count - a.count)

    const topLocationList = tinh.splice(0,5)

    const setMap = (item) => {
        if(item === "Ha Noi") setMapLink("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1877223129145!2d105.84748191493252!3d21.025173486000327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9480a38aa1%3A0x62944277590486be!2zSGFpIELDoCBUcsawbmcsIEhvw6BuIEtp4bq_bSwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1636869251406!5m2!1svi!2s");
        else if(item === "Tay Nguyen" ) setMapLink("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.399618710538!2d107.78284730036087!3d12.084771741400015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173cede6610abc1%3A0x460d5780043f28a8!2zVMOieSBOZ3V5w6puLCDEkMSDayBIYSwgR2lhIE5naGlhLCDEkMSDayBOw7RuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1636869890386!5m2!1svi!2s");
        else setMapLink("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942014.2310753529!2d105.49068431057574!3d22.737788467243355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36ca5cb6615867e7%3A0x653772f437765458!2zQ2FvIELhurFuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1636869963191!5m2!1svi!2s")
    }

    return (
        <div className="top-location flex-col">
            <div className="headerbox flex-center">
                <FontAwesomeIcon icon={faGlobe} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Global Report by Top Locations</p>
                </div>
                <div className="top-location-content flex">
                    <div className="top-location-list">
                        <div className="top-location-div flex header">
                            <div style={{width: '60%'}}>Address</div>
                            <div style={{width: '20%', textAlign: 'right'}}>Name</div>
                            <div style={{width: '20%', textAlign: 'right'}}>Report</div>
                        </div>
                        {report.map((item, index)=>{
                            return (
                                <div 
                                    key={index}
                                    className="top-location-div flex"
                                    onClick={()=>setMap(item.address)}
                                >
                                    <div style={{width: '60%'}}>{item.address}</div>
                                    <div style={{width: '20%', textAlign: 'right'}}>{item.name}</div>
                                    <div style={{width: '20%', textAlign: 'right'}}>{item.review}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="top-location-map">
                        <iframe 
                            title="map"
                            src={mapLink}
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            aria-hidden="false" 
                            tabIndex="0"/>
                    </div>
                </div>
            </div>
        </div>
    )
}