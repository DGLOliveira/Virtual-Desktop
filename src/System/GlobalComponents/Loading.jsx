import "./styles.css";
import { FiLoader } from "react-icons/fi";
export default function Loading({message}) {
    return (
        <loading-suspense>
            Loading {message && <>{message}</>}
            <div>
                <FiLoader />
            </div>
        </loading-suspense>
    )
}   