import React from 'react';
import IconSvg from "../../components/IconSvg.jsx";


const SearchWarning = ({children, id}) => {
    return (
        <div className="result__warning">
            <IconSvg width={24} height={24} id={id} />
            {children}
        </div>
    )
}

export default SearchWarning;