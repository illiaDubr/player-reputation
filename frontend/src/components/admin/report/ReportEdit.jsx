import React from "react";
import {reportData} from "../../../utils/ReportData.js";
import IconSvg from "../../platform/components/IconSvg.jsx";
import {Context} from "../../../api/store/storeContext.js";

const ReportEdit = ({tag, recordId}) => {
    const { store } = React.useContext(Context);
    const [selected, setSelected] = React.useState(tag);
    const [isOpen, setIsOpen] = React.useState(false);

    if (!tag) return null;

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const found = reportData.find((item) => item.backer_tag === selected);
    const displayedName = found ? found.name : "Нет метки";
    const displayedColor = found ? found.color : "gray";

    const handleOptionClick = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const deleteRecord = () => {
        const deleteData = {
            id: recordId,
        }

        store.deleteRecord(deleteData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const editReportData = {
            id: recordId,
            backer_tag: selected,
        }

        console.log(editReportData);

        store.editTagReport(editReportData)
            .then(() => {
                deleteRecord();
            })
    }

    const isChanged = selected !== tag;

    return (
        <form method="PATCH" className="report__form" onSubmit={handleSubmit}>
            <div className={`report__select ${isOpen ? "report__select-open" : ""}`}>
                <div className={`report__select-title report__select-text-${displayedColor}`} onClick={toggleDropdown}>
                    {displayedName}
                    <IconSvg width={15} height={15} id="arrow"/>
                </div>
                {isOpen && (
                    <div className="report__select-options">
                        {reportData.map((item) => (
                            <div
                                className={`report__select-item report__select-text-${item.color}`}
                                key={item.backer_tag}
                                onClick={() => handleOptionClick(item.backer_tag)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button className="report__btn" type="submit" disabled={!isChanged}>
                Обновить метку
            </button>
        </form>
    )
}

export default ReportEdit;