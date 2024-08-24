import "./styles.css";
import { AiOutlineWarning } from "react-icons/ai";
import { AiFillWarning } from "react-icons/ai";
export default function ErrorMessage({errorMessage}){
    console.log(errorMessage);
    return (
        <error-container>
            <div>
                <AiFillWarning className="fullwarning"/>
                <AiOutlineWarning className="radialwarning"/>
                <AiOutlineWarning />
            </div>
            <samp>Error</samp>
            <p>{errorMessage}</p>
        </error-container>
    )
}