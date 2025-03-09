import React from "react";
import {BACKER_ROLE_LIST, PLAYER_ROLE_LIST} from "../../../../utils/RoleData.js";
import Resize from "../../../platform/components/Resize.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ROLE_DATA = {
    backer: {
        list: BACKER_ROLE_LIST,
        cardClass: "role__card role__card-backer"
    },
    player: {
        list: PLAYER_ROLE_LIST,
        cardClass: "role__card role__card-player"
    }
};

function RoleCardContent({data}) {
    return (
        <>
            {data.list.map((item, index) => {
                const randomTop = Math.floor(Math.random() * 350) + "px";
                const randomLeft = Math.floor(Math.random() * 350) + "px";

                return (
                    <div className={data.cardClass} key={index}>
                        <div className="role__card-title">
                            {item.title}
                        </div>
                        <figure>
                            <img src={item.image} alt="" loading="lazy"/>
                        </figure>
                        <span style={{top: randomTop, left: randomLeft}}>
                        </span>
                    </div>
                )
            })}
        </>
    );
}

function RoleSwiperFallback({data}) {
    const randomTop = Math.floor(Math.random() * 450) + "px";
    const randomLeft = Math.floor(Math.random() * 450) + "px";
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
        >
            {data.list.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className={data.cardClass}>
                        <div className="role__card-title">
                            {item.title}
                        </div>
                        <figure>
                            <img src={item.image} alt="" loading="lazy"/>
                        </figure>
                        <span style={{top: randomTop, left: randomLeft}}>
                        </span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

const Role = ({roleType}) => {
    const data = ROLE_DATA[roleType];
    if (!data) return null;

    return (
        <Resize width={801} fallback={<RoleSwiperFallback data={data}/>}>
            <RoleCardContent data={data}/>
        </Resize>
    );
};

export default Role;