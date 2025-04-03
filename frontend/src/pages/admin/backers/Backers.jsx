import React from "react";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import BackersList from "../../../components/admin/backers/BackersList.jsx";
import ApprovedBackers from "../../../components/admin/backers/ApprovedBackers.jsx";

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

    console.log(unApprovedBackers);



    return (
        <AdminMain pageTitle="Заявки на верефикацию">
            <div className="admin__wrap">
                <BackersList data={unApprovedBackers} control={true}/>
            </div>
            <ApprovedBackers />
        </AdminMain>
    )
})

export default Backers;