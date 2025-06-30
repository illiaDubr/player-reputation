import React from "react";
import styles from "./ResultItemList.module.scss";
import "./pagination.scss"
import ReactPaginate from "react-paginate";
import ResultItem from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ResultItem";
import IconSvg from "@shared/ui/IconSvg";
import {backerTags} from "@shared/config/backerTags.js";
import ClaimAmount from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ClaimAmount";
import ResultItemActions from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ResultItemActions";
import Modal from "@shared/ui/Modal";
import ResultItemActionsForm
    from "@features/search/player-search/ui/SearchResult/ui/ResultItemList/ui/ResultItemActionsForm/index.js";

const itemsPerPage = 15;

const hasContent = (value) => value !== undefined && value !== null && value !== "";

function formatDate(dateString) {
    if (!dateString) return "-";
    return dateString.slice(0, 10);
}

function getBackerTag(tag) {
    return backerTags[tag];
}

const ResultItemList = ({results = [], checked, backerId}) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const pageCount = Math.ceil(results.length / itemsPerPage);
    const currentResults = results.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const formatFullName = (first, last, middle) => [last, first, middle].filter(Boolean).join(' ');

    return (
        <div className={`${styles[`result__wrapper`]}`}>
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

            {currentResults.map((result) => {
                const date = formatDate(result.created_at);
                const tagObj = getBackerTag(result.backer_tag);
                const name = tagObj?.name || "";
                const color = tagObj?.color || "";

                return (
                    <div className={`${styles[`result__item`]}`} key={result.player_id}>
                        <div className={`${styles[`player__card`]} ${styles[`player__card-left`]}`}>
                            <div className={`${styles[`player__full-name`]}`}>
                                {formatFullName(result.first_name, result.last_name, result.middle_name)}
                            </div>
                            <div className={styles[`player__item-wrap`]}>
                                {
                                    [
                                        {title: "", content: result.phonenumber, iconId: "search__phone"},
                                        {title: "", content: result.email, iconId: "search__mail"},
                                        {title: "", content: result.discord, iconId: "search__discord"},
                                        {title: "PS", content: result.PS, iconId: "PS"},
                                        {title: "PS", content: result.Pokerstars_com, iconId: "PS"},
                                        {title: "PS.es", content: result.Pokerstars_es, iconId: "PS"},
                                        {title: "WPN", content: result.WPNpoker, iconId: "WPN"},
                                        {title: "WMX", content: result.Winamax_es, iconId: "WMX"},
                                        //{title: "IP", content: result., iconId: "IP"},
                                        {title: "GG", content: result.GG, iconId: "GG"},
                                        {title: "GG", content: result.Ggnetwork, iconId: "GG"},
                                        {title: "888", content: result["888poker"], iconId: "888"},
                                    ]
                                        .filter(pair => hasContent(pair.content))
                                        .map((pair, index) => (
                                            <ResultItem
                                                key={index}
                                                title={pair.title}
                                                content={pair.content}
                                                iconId={pair.iconId}
                                            />
                                        ))
                                }
                            </div>
                        </div>
                        <div className={`${styles[`player__card`]} ${styles[`player__card-right`]}`}>
                            <div className={styles[`player__info`]}>
                                <div>
                                    <IconSvg width={48} height={48} id={result.fund_name} variant="funds"/>
                                </div>
                                запись от
                                <br/>
                                {date}
                            </div>
                            <div className={styles[`player__card-tag--wrap`]}>
                                <div
                                    className={`${styles[`player__card-tag`]} ${styles[`player__card-tag--${color}`]}`}>
                                    {name}
                                </div>
                                {result.discord && (
                                    <div className={`${styles[`player__card-tag`]} ${styles[`player__card-tag--ds`]}`}>
                                        <IconSvg width={22} height={22} id="discord"/>
                                    </div>
                                )}
                            </div>
                            <div className={styles[`player__card-amount`]}>
                                <ResultItem
                                    title="Фонд"
                                    content={result.fund_name || "Player`s Reputation"}
                                />
                                <ClaimAmount
                                    src={result.source}
                                    dmg={result.damage}
                                    makeUp={result.makeUp}
                                />
                                <ResultItem
                                    title="Комментарий от фонда"
                                    content={result.comment}
                                    className="player__item-comment"
                                />
                            </div>
                            <ResultItemActions checked={checked} player={result}/>
                        </div>
                    </div>
                )
            })}

            <Modal name="Actions" contentClass="actions__modal">
                {(modal) => <ResultItemActionsForm origin={modal.params?.origin} player={modal.params?.player}
                                                   backerId={backerId}/>}
            </Modal>
            <Modal name="Result" title="Успешно">
            </Modal>
        </div>
    )
}

export default ResultItemList;