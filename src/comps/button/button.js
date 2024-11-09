import { BounceLoader } from 'react-spinners';

const Button = ({ name, type, onClick, loading }) => {
    return (
        <>
        {
            loading == true ?    <BounceLoader size={50} color={"#F0D0A6"} loading={loading} /> :             <button type={type} onClick={onClick} className='text-custom-c3 text-2xl border-2 p-3 border-custom-c3 hover:bg-custom-c2 hover:text-custom-c1 rounded-2xl'>{name}</button>
        }
        
            
        </>
    )
}

export default Button;