import "./styles.css";
export default function Loading({ message }) {
    return (
        <loading-suspense>
            <div>
                <svg className="combined-animation" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="hex hex1" style={{ mixBlendMode: "screen" }} d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z" fill="#FF0000" stroke="#808080" stroke-width="4" />
                    <path className="hex hex2" style={{ mixBlendMode: "screen" }} d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z" fill="#00FF00" stroke="#808080" stroke-width="4" />
                    <path className="hex hex3" style={{ mixBlendMode: "screen" }} d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z" fill="#0000FF" stroke="#808080" stroke-width="4" />
                    <path className="axis" d="M200 200L200 60" stroke="#808080" stroke-width="4" />
                    <path className="axis" d="M200 200L78.7564 270" stroke="#808080" stroke-width="4" />
                    <path className="axis" d="M200 200L321.244 270" stroke="#808080" stroke-width="4" />
                </svg>
            </div>
            Loading {message && <>{message}</>}
        </loading-suspense>
    )
}   