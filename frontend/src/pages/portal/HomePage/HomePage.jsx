import React from "react";
import {Helmet} from "react-helmet-async";
import {clsx} from "clsx";
import styles from './HomePage.module.scss';
import Title from "@pages/portal/HomePage/ui/Title";
import EducationVideo from "@pages/portal/HomePage/ui/EducationVideo";
import RoleInfoSection from "@pages/portal/HomePage/ui/RoleInfoSection";
import FeedbackForm from "@pages/portal/HomePage/ui/FeedbackForm";
import AuthModal from "@features/auth/ui/AuthModal";

const HomePage = () => {

    return (
        <>
            <Helmet>
                <title>
                    Player`s Reputation
                </title>
            </Helmet>
            <section className={clsx(styles['title-section'], styles['portal-section'])}>
                <Title />
                <EducationVideo />
            </section>
            {/*
           <section className={clsx(styles['role-section'], styles['portal-section'])}>
                <RoleInfoSection />
            </section>
            */}
            <section className={clsx(styles['subscription-section'], styles['portal-section'])}>
                <FeedbackForm />
            </section>
            <AuthModal />
        </>
    )
}

export default HomePage;