import React from 'react';
import {Context} from "../../../api/store/storeContext.js";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {recordsText} from "../../../utils/AdminData.js";
import RecordList from "../../../components/admin/records/RecordList.jsx";
import CloseRecord from "../../../components/admin/records/CloseRecord.jsx";
import DiscussionRecord from "../../../components/admin/records/DiscussionRecord.jsx";

const Records = observer(() => {
    const { store } = React.useContext(Context);
    const [recordsData, setRecordsData] = React.useState([]);

    React.useEffect(() => {
        store.getRecords().then((response) => {
            setRecordsData(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(recordsData);

    return (
        <AdminMain pageTitle="Измененные записи" text={recordsText}>
            <div className="admin__wrap">
                <RecordList data={recordsData} discussion={true} closeRecord={true}/>
            </div>
            <DiscussionRecord />
            <CloseRecord />
        </AdminMain>
    );
})

export default Records;