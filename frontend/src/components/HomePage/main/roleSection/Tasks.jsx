import React from "react";
import {PLAYER_LIST, BACKER_LIST} from "../../../../utils/RoleData.js";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

const Tasks = ({tasksType, totalHeight, setTotalHeight}) => {
    const playerTask = chunkArray(PLAYER_LIST, 2);
    const backerTask = chunkArray(BACKER_LIST, 2);

    const sectionRef = React.useRef(null);
    const itemsRef = React.useRef([]);

    const PIN_DURATION = 800;
    const SPACING = 115;

    React.useEffect(() => {
        const items = itemsRef.current;
        if (!items.length) return;

        const numElements = items.length;
        const lastSpacing = (numElements - 1) * SPACING;
        const lastItemHeight = items[numElements - 1]?.offsetHeight || 0;
        const finalHeight = lastItemHeight + lastSpacing + PIN_DURATION;

        setTotalHeight(finalHeight);

        console.log(lastItemHeight);
    }, [tasksType, setTotalHeight]);


    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top-=200 top",
                    end: `+=${PIN_DURATION}`,
                    pin: true,
                    scrub: 1,
                },
            });

            itemsRef.current.forEach((el, index) => {
                tl.from(el, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                }, index * 1.5);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [tasksType])

    switch (tasksType) {
        case "backer":
            return (
                <div className="" key="backer">
                    <div className="tasks__switch-box" ref={sectionRef}>
                        {backerTask.map((taskGroup, i) => (
                            <div className="tasks__content" key={i} ref={(el) => (itemsRef.current[i] = el)}>
                                {taskGroup.map((task) => (
                                    <div className="tasks__item" key={task.id}>
                                        <div className="tasks__item-title">{task.title}</div>
                                        <div className="tasks__item-description">{task.description}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            );

        case "player":
            return (
                <div className="" key="player">
                    <div className="tasks__switch-box" ref={sectionRef}>
                        {playerTask.map((taskGroup, i) => (
                            <div className="tasks__content" key={i} ref={(el) => (itemsRef.current[i] = el)}>
                                {taskGroup.map((task) => (
                                    <div className="tasks__item" key={task.id}>
                                        <div className="tasks__item-title">{task.title}</div>
                                        <div className="tasks__item-description">{task.description}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return null;
    }
};

export default Tasks;