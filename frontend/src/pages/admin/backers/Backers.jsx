import React from "react";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";

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
        </AdminMain>
    )
})

export default Backers;