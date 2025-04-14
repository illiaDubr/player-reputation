import React from "react";
import {editFormData} from "../../../../../utils/EditData.js";
import {Context} from "../../../../../api/store/storeContext.js";
import {useModal} from "../../../components/Modal.jsx";
import {reportData} from "../../../../../utils/ReportData.js";
import IconSvg from "../../../components/IconSvg.jsx";
import ChangeTooltip from "./ChangeTooltip.jsx";

const PlayerManagementForm = ({currentModal, backer, user, tag, modalOpen}) => {
    const {store} = React.useContext(Context);
    const {closeAllModals} = useModal();
    const [selected, setSelected] = React.useState(tag);
    const [isOpen, setIsOpen] = React.useState(false);

    if (!user) return null;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (currentModal === "report") {
                const report = {
                    id: backer,
                    player_id: user.player_id,
                    backer_tag: user.backer_tag,
                    comment: data.comment,
                }
                store.report(report);
                //modalOpen();
            } else if (currentModal === "edit") {
                const finalComment = data.comment.trim() ? data.comment : user.comment;
                const finalDamage = data.damage.trim() ? data.damage : user.damage;

                const payload = {
                    comment: finalComment,
                    damage: finalDamage,
                    player_id: user.player_id,
                    id: user.reputation_records?.[0]?.id,
                    makeUp: 0,
                    backer_tag: selected,
                }
                console.log("Отправляем payload:", payload);
                store.userEdit(payload);
                //modalOpen();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {editFormData.filter((item) => item.name === currentModal).map((item, index) => (
                <form method={item.method} key={index} className="modal__body" onSubmit={handleSubmit}>
                    {item.name === "report" && (
                        <>
                            <ChangeTooltip text={item.text}/>
                            <div className="modal__input-box">
                                <label className="label" htmlFor="comment">
                                    Комментарий
                                </label>
                                <textarea name="comment" className="textarea" id="comment">
                            </textarea>
                            </div>
                        </>
                    )}
                    {item.name === "edit" && (
                        <>
                            <ChangeTooltip text={item.text}/>
                            <div className="modal__input-box" style={{zIndex: 2}}>
                                <label className="label" htmlFor="">
                                    Смена метки
                                </label>
                                <div className={`report__select ${isOpen ? "report__select-open" : ""}`}>
                                    <div className={`report__select-title report__select-text-${displayedColor}`}
                                         onClick={toggleDropdown}>
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
                            </div>
                            <div className="modal__input-box">
                                <label htmlFor="damage" className="label">
                                    Сумма ущерба
                                </label>
                                <div className="input">
                                    $
                                    <input id="damage" name="damage" inputMode="numeric"
                                           pattern="\d*"
                                           placeholder="Введите сумму"
                                           onInput={(e) => {
                                               e.target.value = e.target.value.replace(/\D/g, '');
                                           }} className="hidden-input"/>
                                </div>
                            </div>
                            <div className="modal__input-box">
                                <label className="label" htmlFor="comment">
                                    Комментарий
                                </label>
                                <textarea name="comment" className="textarea" id="comment">
                                </textarea>
                            </div>
                        </>
                    )}
                    <button type="submit" className="modal__form-btn">
                        {item.button}
                    </button>
                </form>
            ))}
        </>
    )
}

export default PlayerManagementForm;