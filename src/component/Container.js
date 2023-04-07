import React, {useEffect, useState, useContext} from 'react'
import ShowData from './ShowData'
import { dataRef } from './firebase/firebase';
import NumberContext from '../context/NumberContext';

const Container = () => {
  
  const ContextValue = useContext(NumberContext);

  const [data, setdata] = useState();
  useEffect(()=>{

    dataRef.ref().once('value',data=>{
      const getData = Object.values(data.val());
      setdata(getData);
      ContextValue.updateCount(getData);
    })
    },[])


  return (
    <div className='container'>
        <div className='header'>
                <h2>SEQCUR<b>AI</b>SE</h2>
                <div className='male-female-count'>
                  <div className='count-box male'>{ContextValue.numberCount.maleCount}</div>
                  <div className='count-box female'>{ContextValue.numberCount.femaleCount}</div>
                </div>
        </div>

        <div className='container-2'>
        <div className='sidebar'>
            <div className='burger'>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
               
            </div>
        </div>
        {data && <ShowData data={data}/>}
        </div>

    </div>
  )
}

export default Container