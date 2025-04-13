import React from 'react';
import {Context} from "../../../../../api/store/storeContext.js";

const FormTitle = ({fundName, checked, setChecked}) => {
    const {store} = React.useContext(Context);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    React.useEffect(() => {
        if (checked) {
            store.search({ fund_name: fundName });
        }
    }, [checked, fundName, store]);

    return (
        <div className="search__title-wrap">
            <h3 className="search__title">
                {checked ? "Поиск по записям своего фонда" : "Поиск по общей базе"}
            </h3>
            <div className="search__switch-wrap">
                {checked ? "Переключиться на поиск по общей базе" : "Переключиться на записи только своего фонда"}
                <input type="checkbox" id="switch" checked={checked} onChange={handleChange} />
                <label className="search__switch" htmlFor="switch">
                </label>
            </div>
        </div>
    )
}

export default FormTitle;