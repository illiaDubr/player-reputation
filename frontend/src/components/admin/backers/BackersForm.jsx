import React from "react";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Context} from "../../../api/store/storeContext.js";

const BackersForm = ({fund, backerId}) => {
    const {store} = React.useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        const backerData = {
            id: backerId,
            approved: "yes",
        }

        const fundData = {
            fund_for_search: fund,
            id: backerId,
        }

        store.approvedBacker(backerData)
        store.changeFundBacker(fundData);
    }


    return (
        <>
            <form className="record__form" onSubmit={handleSubmit}>
                <button type="submit" className="record__btn" disabled={!fund}>
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