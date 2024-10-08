import { useEffect, useState } from "react";

export const Debounce = (value,delay) =>{
    const [debounce,setDebounce] = useState(value);
    
    useEffect (()=>{
        const timer = setTimeout(()=>{
            setDebounce(value);
        },delay)

        return() =>{
            clearTimeout(timer);
        }
    
    },[value,delay])

    return(
        debounce
    )
   
}