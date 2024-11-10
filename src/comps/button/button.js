import { useImperativeHandle, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { forwardRef } from 'react';

const Button = forwardRef(({ name, type,  onClick},ref) => {
    const[loading,setLoading] = useState(false);
 
    const setLoadingOff= () => { 
        setLoading(false);
    }

    const setLoadingOn= () => { 
        setLoading(true);
    }
    
    const execFunc = () => {
        onClick(); 
    }

    useImperativeHandle(ref,() => ({
           setLoadingOff,setLoadingOn 
    }));

    return (
        <>
        { 
        loading == true ?    <BounceLoader size={50} color={"#F0D0A6"} loading={loading} /> :             <button type={type} onClick={execFunc} className='text-custom-c3 text-2xl border-2 p-3 border-custom-c3 hover:bg-custom-c2 hover:text-custom-c1 rounded-2xl'>{name}</button>
        }  
        </>
    )
});


export { Button };