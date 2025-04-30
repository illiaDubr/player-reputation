import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";
import ResultItem from "./ResultItem.jsx";
import {Modal, useModal} from "../../../components/Modal.jsx";
import PlayerManagement from "./PlayerManagement.jsx";
import {editModalData} from "../../../../../utils/EditData.js";
import PlayerManagementForm from "./PlayerManagementForm.jsx";
import ReactPaginate from "react-paginate";
import {backerTagConfig, dynamicFields} from "../../../../../utils/SearchData.js";
import SourceTooltipText from "./SourceTooltipText.jsx";
import ClaimAmount from "./ClaimAmount.jsx";


function getBackerTagConfig(tag) {
    return backerTagConfig[tag] || backerTagConfig.default;
}

function formatFullName(firstName, lastName, middleName) {
    return `${firstName || ""} ${lastName || ""} ${middleName || ""}`.trim();
}

function formatDate(dateString) {
    if (!dateString) return "-";
    return dateString.slice(0, 10);
}



const ResultItemList = ({results = [], backer, backersFund}) => {
    const [openItems, setOpenItems] = React.useState({});
    const [expandedComments, setExpandedComments] = React.useState({});
    const [selectedUser, setSelectedUser] = React.useState(null);
    const {closeAllModals, openModal} = useModal();

    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 15;
    const pageCount = Math.ceil(results.length / itemsPerPage);
    const currentResults = results.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    const sectionRef = React.createRef();
    const [scrollBtn, setScrollBtn] = React.useState(false);

    const openReadyModal = () => {
        openModal("ready");
    }

    const toggleClass = (player_id) => {
        setOpenItems((prevState) => ({
            ...prevState,
            [player_id]: !prevState[player_id],
        }));
    };

    const toggleComment = (player_id) => {
        setExpandedComments((prev) => ({
            ...prev,
            [player_id]: !prev[player_id],
        }));
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const scrollToTop = () => {
        if (sectionRef.current) {
            const elementTop = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementTop - 200,
                behavior: "smooth",
            });
        }
    };

    React.useEffect(() => {
        if (pageCount > 1) {
            const scrollHandler = (e) => {
                const docEl = e.target.documentElement;
                const scrollBottom = docEl.scrollHeight - (docEl.scrollTop + window.innerHeight);
                if (scrollBottom < 100) {
                    setScrollBtn(true);
                } else {
                    setScrollBtn(false);
                }
            };
            document.addEventListener("scroll", scrollHandler);
            return () => document.removeEventListener("scroll", scrollHandler);
        }
    }, [pageCount]);

    return (
        <div className="result__wrapper" ref={sectionRef}>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                previousLabel="<"
                nextLabel=">"
                containerClassName="pagination"
                activeClassName="active"
            />

            {currentResults.map((item) => {
                const {
                    player_id,
                    backer_tag,
                    first_name,
                    last_name,
                    middle_name,
                    phonenumber,
                    email,
                    discord,
                    fund_name,
                    created_at,
                    damage,
                    source,
                    comment,
                    reputation_records = []
                } = item;

                const makeUp = reputation_records[0]?.makeUp || null;
                const {text, color} = getBackerTagConfig(backer_tag);
                const fullName = formatFullName(first_name, last_name, middle_name);
                const date = formatDate(created_at);

                const dynamicFieldItems = dynamicFields
                    .map(({key, label}) => {
                        const fieldValue = item[key];
                        return fieldValue ? {key, content: fieldValue, label} : null;
                    })
                    .filter(Boolean);

                const firstThreeFields = dynamicFieldItems.slice(0, 3);
                const remainingFields = dynamicFieldItems.slice(3);

                return (
                    <div className="result__box" key={player_id}>
                        <div className="result result-left">
                            <div className="result__title">
                                {fullName}
                            </div>
                            <div className="result__info">
                                {phonenumber && (
                                    <ResultItem
                                        content={phonenumber}
                                        iconId="search__phone"
                                    />
                                )}
                                {email && (
                                    <ResultItem
                                        content={email}
                                        iconId="search__mail"
                                    />
                                )}
                                {discord && (
                                    <ResultItem
                                        content={discord}
                                        iconId="search__discord"
                                        label="Discord:"
                                    />
                                )}

                                {firstThreeFields.map(({key, content, label}) => (
                                    <ResultItem
                                        key={key}
                                        content={content}
                                        label={label}
                                    />
                                ))}
                            </div>
                            {remainingFields.length > 0 && (
                                <>
                                    <div
                                        className={`result__info ${openItems[player_id] ? "result__info-active" : "result__info-close"}`}>
                                        {remainingFields.map(({key, content, label}) => (
                                            <ResultItem
                                                key={key}
                                                content={content}
                                                label={label}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        className={`result__btn ${openItems[player_id] ? "result__btn-active" : ""}`}
                                        type="button" onClick={() => toggleClass(player_id)}>
                                        {`${openItems[player_id] ? "Свернуть" : "Показать еще"}`}
                                        <IconSvg width={20} height={20} id="arrow"/>
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="result result-right">
                            <div className="result__title">
                                <IconSvg width={48} height={48} id={fund_name} variant="funds"/>
                                <div className="result__date">
                                    запись от
                                    <br/>
                                    {date}
                                </div>
                            </div>

                            <div className="result__user-status-wrap">
                                <div className={`result__user-status result__user-status--${color}`}>
                                    {text}
                                </div>
                                {source === "discord" && (
                                    <SourceTooltipText />
                                )}
                            </div>

                            <div className="result__info">
                                <ClaimAmount
                                    dmg={damage}
                                    src={source}
                                    makeUp={makeUp}
                                />
                                <div className="result__text">
                                    <div className="result__head">
                                        <div className="result__label">
                                            Комментарий от фонда:
                                        </div>
                                    </div>
                                    <div className="result__content">
                                        {comment && comment.length > 150 && !expandedComments[player_id] ? (
                                            <>
                                                {comment.slice(0, 150)}...
                                                <button
                                                    className="result__toggle-btn"
                                                    onClick={() => toggleComment(player_id)}
                                                >
                                                    Показать еще
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {comment || "Комментарий отсутствует"}
                                                {comment && comment.length > 150 && (
                                                    <button
                                                        className="result__toggle-btn"
                                                        onClick={() => toggleComment(player_id)}
                                                    >
                                                        Скрыть
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <PlayerManagement user={item} setSelectedUser={setSelectedUser} backersFund={backersFund} fund={fund_name}/>
                        </div>
                    </div>
                );
            })}

            <button type="button" className={`btn-to-top ${scrollBtn ? "active" : ""}`} onClick={scrollToTop}>
                <IconSvg width={20} height={20} id="arrow"/>
            </button>

            {editModalData.map((modalItem, index) => (
                <Modal modalName={modalItem.name} key={index}>
                    <div className="modal__title">
                        {modalItem.title}
                        <button className="modal__btn" type="button" onClick={closeAllModals}>
                            <IconSvg width="36" height="36" id="close-menu"/>
                        </button>
                    </div>
                    <PlayerManagementForm currentModal={modalItem.name} backer={backer} user={selectedUser} tag={results.backer_tag} modalOpen={openReadyModal}/>
                </Modal>
            ))}

            <Modal modalName="ready">
                <div className="modal__title modal__title-ready">
                    Готово !
                    <button className="modal__btn" type="button" onClick={closeAllModals}>
                        <IconSvg width="36" height="36" id="close-menu"/>
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ResultItemList;
