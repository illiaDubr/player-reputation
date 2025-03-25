import React from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../../api/store/storeContext.js";
import ReportItem from "./ReportItem.jsx";

const DiscussionReports = observer(() => {
    const {store} = React.useContext(Context);
    const [discussionReports, setDiscussionReports] = React.useState([]);

    React.useEffect(() => {
        store.getDiscussionReports().then((response) => {
            setDiscussionReports(response.data.data);
        })
    })

    return (
        <div className="admin__wrap">
            <ReportItem data={discussionReports} tagEdit={true} discussion={false}/>
        </div>
    )
})

export default DiscussionReports;