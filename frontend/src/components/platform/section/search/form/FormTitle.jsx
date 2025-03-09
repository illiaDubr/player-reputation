import React from 'react';

const FormTitle = () => {
    const [isSwitched, setIsSwitched] = React.useState(false);

    const handleSwitchChange = () => {
        setIsSwitched((prev) => !prev);
    };

    return (
        <div className="search__title-wrap">
            <h3 className="search__title">
                {isSwitched ? "Поиск по записям своего фонда" : "Поиск по общей базе"}
            </h3>
            <div className="search__control">
                <div className="search__switch-wrap">
                    {isSwitched ? "Переключиться на поиск по общей базе" : "Переключиться на поиск по своим записям"}
                    <input type="checkbox" id="switch" checked={isSwitched} onChange={handleSwitchChange} />
                    <label className="search__switch" htmlFor="switch">
                    </label>
                </div>
                {isSwitched && (
                    <div className="search__checkbox-wrap">
                        <input className="search__checkbox" id="styled-checkbox-1" type="checkbox" value="value1"/>
                        <label htmlFor="styled-checkbox-1">
                            Показать все записи своего фонда
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormTitle;