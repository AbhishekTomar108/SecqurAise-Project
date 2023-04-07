import React, { useState, useEffect, useContext} from 'react'
import Female05 from './Female05.jpg'
import { storage } from './firebase/firebase';
import {getDownloadURL, ref} from "firebase/storage"
import NumberContext from '../context/NumberContext';

const ShowData = (props) => {
    const ContextValue = useContext(NumberContext);
    const [PersonsData, setPersonsData] = useState(props.data);
    const [user, setuser] = useState({
        name:props.data[0].Name,
        location:props.data[0].Location,
        date:props.data[0].Date,
        time:props.data[0].Time,
        gender:props.data[0].Gender,
        id:props.data[0].ID
    })

    const [personImg, setpersonImg]  = useState();
    const [prevIndex, setprevIndex] = useState(-1);
    const [status, setstatus] = useState(true);

    useEffect(()=>{
        
        const imgRef = ref(storage, "images/"+PersonsData[0].Name+".jpg");

        getDownloadURL(imgRef)
        .then((url)=>{

            setpersonImg(url);
            
        })
                changeDetail(PersonsData[0],0);

    },[PersonsData])

    const persondetails =(data)=>{

        const newdate = new Date(date); 
        const month = newdate.toLocaleString('default', { month: 'long' });
        let day = newdate.getDate();
        let year = newdate.getFullYear();
      
        
        setuser({
            name:data.Name,
            location:data.Location,
            date:data.Date,
            time:data.Time,
            gender:data.Gender,
            id:data.ID
        })
    }
     
    const changeDetail = (data,index)=>{
         setuser({
                    name:data.Name,
                    location:data.Location,
                    date:data.Date,
                    time:data.Time,
                    gender:data.Gender,
                    id:data.ID
                })

               
                const imgRef = ref(storage, "images/"+data.Name+".jpg");

                getDownloadURL(imgRef)
                .then((url)=>{

                    setpersonImg(url)
                })

           
                if(prevIndex>=0 && (prevIndex<PersonsData.length))
                {
                    
                    const previousdetailsbox = document.getElementsByClassName('details')[prevIndex];
                    previousdetailsbox.style.color="black";
                    previousdetailsbox.style.backgroundColor="#dddddd";
                }

              
                const currentdetailsbox = document.getElementsByClassName('details')[index];
                currentdetailsbox.style.color="white";
                currentdetailsbox.style.backgroundColor="grey";             

                setprevIndex(index);
                
         

                
    }

    let filterstate = 0;
    const showFilter =()=>{

        if(!filterstate)
        {
        document.getElementsByClassName('filter-block')[0].style.display="block";
        filterstate = 1;
        }

        else{
        document.getElementsByClassName('filter-block')[0].style.display="none";
        filterstate = 0;

        }

    }

    const filterData = () =>{

        
        const gender = document.getElementById('gender').value;
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
       
        const newdate = new Date(date); 
        const month = newdate.toLocaleString('default', { month: 'short' });
        let day = newdate.getDate();
        let getyear = newdate.getYear();
        let year = getyear-100;
        let finaldate = day+"-"+month+"-"+year;
       

        if(gender==="" || location==="" || date==="")
        {
            alert("Please select all filter");
        }

        else{
        const newData = props.data.filter(data=>{     
          
             return (data.Gender===gender && data.Location===location && data.Date===finaldate);
            
        })

        {newData.length!==0?setPersonsData(newData):setstatus(false)}
        {newData.length!==0 && setstatus(true)}
        ContextValue.updateCount(newData);
    }
       
    }


  return (
    <div className='showdata'>
    
        {status===false?<div className='noDetails'>No Detail to show</div> :<div className='person-details-images'>
            <div className='selected-person-details'>
            <h2>{user.id}</h2>
            <h2>person detected</h2>
        <div className='person-name-detail'>
            <span>Name</span>
            <span>:{user.name}</span>
            <span>Location</span>
            <span>:{user.location}</span>
            <span>Date</span>
            <span>:{user.date}</span>
            <span>Time</span>
            <span>:{user.time}</span>
        </div>

        <div className='description'>
            <span>Description:</span>
            <p>{user.name} person detected at {user.location} on {user.date}</p>
        </div>

        </div>

        <div className='person-images'>
        <h2>{user.gender}</h2>
           {personImg && <img id="personimg" src={personImg}/>}
        </div>
        </div>}
        

         <div className='event'>
            <div className='top'>
           <div className='event-head'>
            <span>Events</span>
            </div>

            <div className='sandwich' onClick={showFilter}>
                <div className='line'>
                    <div className='circle circle1'></div>
                </div>
                <div className='line'>
                <div className='circle circle2'></div>
                </div>
                <div className='line'>
                <div className='circle circle3'></div>
                </div>
         
           </div>
           </div>

           <div className='filter-block'>
           <div className='filter'>
            <div>
                <select id='gender'> 
                    <option disabled selected>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div>
            <select id="location">
                    <option disabled selected>Location</option>
                    <option>Hyderabad</option>
                    <option>Chennai</option>
                    <option>Bangalore</option>
                </select>
            </div>
            <div>
                <input type='date' id="date"/>
            </div>

            <button id='filter-btn' onClick={filterData}>Filter</button>
           </div>
           </div>
          

           <div className='all-details'>
           
        {status===false?<div>Sorry no such data is available</div>:Array.from(PersonsData).map((data,index)=>{
            return(
                 <div key={index} className='details'  onClick={()=>{changeDetail(data,index)}}>

            <div className='upper-part'>
            <span id="person-id">{data.ID}: {data.Location}</span>
            <span>{data.Date} {data.Time}</span>
            </div>

            <h2>Person detected</h2>
        </div>
            )
        })}

           </div>
           
         </div>
         </div>
        
  )
}

export default ShowData