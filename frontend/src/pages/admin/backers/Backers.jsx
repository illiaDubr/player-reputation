import React from "react";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import BackersItemList from "../../../components/admin/backers/BackersItemList.jsx";
import ApprovedBackers from "../../../components/admin/backers/ApprovedBackers.jsx";
import {Helmet} from "react-helmet-async";

const Backers = observer(() => {
    const {store} = React.useContext(Context);
    const [unApprovedBackers, setUnApprovedBackers] = React.useState([]);


    React.useEffect(() => {
        store.getUnApprovedBackers().then((response) => {
            setUnApprovedBackers(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store])

    return (
        <>
            <Helmet>
                <title>
                    Заявки на верификацию
                </title>
            </Helmet>
            <AdminMain pageTitle="Заявки на верификацию">
                <div className="admin__wrap">
                    <BackersItemList data={unApprovedBackers} control={true}/>
                </div>
                <ApprovedBackers />
            </AdminMain>
        </>
    )
})

export default Backers;