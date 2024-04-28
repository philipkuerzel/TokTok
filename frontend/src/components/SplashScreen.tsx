import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
    const navigate = useNavigate()

    useEffect(()=> {
        setTimeout(() => {
            navigate('/feed')
        }, 1500);
    })
    return ( 
        <>

        </>
     );
}
 
export default SplashScreen;