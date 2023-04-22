import 'animate.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loader.css';
const Loader = () => {
    const [style, setStyle] = useState('animate__animated animate__zoomIn');
    const navigate = useNavigate();

    setTimeout(() => {
        setStyle('animate__animated animate__zoomOut')
    }, 2000)

    useEffect(() => {
        setTimeout(() => {
            navigate('/openChat')
        }, 3000)
    },[])
    return ( 
        <div className="loader-parent">
            <div className={style}>
                
            </div>
        </div>
     );
}
 
export default Loader;