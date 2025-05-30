import React from "react";
import {Link, useMatches} from 'react-router-dom';
import styles from './PlatformBreadcrumbs.module.scss';
import {ROUTES} from '@shared/config/routes.js';

const PlatformBreadcrumbs = () => {
    const matches = useMatches();

    const crumbs = matches
        .filter((match) => Boolean(match.handle?.breadcrumb))
        .map((match) => {
            const breadcrumb = match.handle.breadcrumb;
            return {
                label: typeof breadcrumb === 'function'
                    ? breadcrumb(match.params)
                    : breadcrumb,
                pathname: match.pathname,
            };
        });

    if (crumbs.length <= 1) {
        return null;
    }

    return (
        <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
            <ul className={styles.breadcrumb__list}>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    const linkPath = (index === 0 && crumb.label === "Player`s Reputation")
                        ? ROUTES.PLATFORM.MAIN_PAGE
                        : crumb.pathname;

                    return (
                        <li key={crumb.pathname + '-' + index} className={styles.breadcrumb__item}>
                            {isLast ? (
                                <span aria-current="page" className={styles.current__page}>
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link to={linkPath} className={styles.current__link}>{crumb.label}</Link>
                            )}
                            {!isLast && <span className={styles.separator}>/</span>}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default PlatformBreadcrumbs;