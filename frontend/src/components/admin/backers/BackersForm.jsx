import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";

const BackersForm = () => {
    return (
        <>
            <form className="record__form">
                <button type="submit" className="record__btn">
                    <IconSvg width={16} height={16} id="check__mark" />
                    Одобрить верификацию
                </button>
            </form>
            <form className="record__form">
                <button type="submit" className="record__btn">
                    <IconSvg width={16} height={16} id="close" />
                    Отклонить верификацию
                </button>
            </form>
        </>
    )
}

export default BackersForm;