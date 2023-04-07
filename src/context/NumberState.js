import react, {useEffect, useState} from "react";
import NumberContext from "./NumberContext"



const NumberState =(props)=>{

    const [numberCount, setnumberCount] = useState({
        maleCount:20,
        femaleCount:20
    })

    const updateCount =(data)=>{
        let female = 0;
        let male =0;

        {data.length!==0 && data.filter((element)=>{
            if(element.Gender==="Female"){
                female = female +1;
            }

            else if(element.Gender==="Male"){
                male = male +1;
            }
        })}

        setnumberCount({
            maleCount:male,
            femaleCount:female
        })
    }
    return(
        <NumberContext.Provider value={{numberCount, updateCount}}>
            {props.children}
        </NumberContext.Provider>
    )
}

export default NumberState;
