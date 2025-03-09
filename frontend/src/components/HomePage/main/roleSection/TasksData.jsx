import React from "react";
import {PLAYER_LIST} from "../../../../utils/RoleData.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const chunkArray = (array, size) => {
    return array.reduce((acc, _, index) => {
        if (index % size === 0) {
            acc.push(array.slice(index, index + size));
        }
        return acc;
    }, []);
};

const TasksData = ({tasksType, totalHeight, setTotalHeight}) => {
    const groupedTasks = chunkArray(PLAYER_LIST, 2);

    const sectionRef = React.useRef(null);
    const itemsRef = React.useRef([]);

    const spacing = 115;

    React.useEffect(() => {

        const section = sectionRef.current;
        const items = itemsRef.current;

        setTimeout(() => {
            const numElements = items.length;
            const lastSpacing = (numElements - 1) * spacing;

            const lastItemHeight = items[numElements - 1]?.offsetHeight || 0;

            const finalHeight = lastItemHeight + lastSpacing;

            setTotalHeight(finalHeight);
        }, 100);


        gsap.to(items, {
            scrollTrigger: {
                manual: true,
                scrub: true,
            },
            opacity: 1, y: 0,
        })
    }, [])

    console.log(totalHeight)

    switch (tasksType) {
        case "backer":
            return (
                <div className="role-content">
                    backer
                </div>
            );

        case "player":
            return (
                <div className="tasks__switch-box" ref={sectionRef}>
                    {groupedTasks.map((taskGroup, index) => (
                        <div className="tasks__content" key={index}   ref={(el) => (itemsRef.current[index] = el)}>
                            {taskGroup.map((task) => (
                                <div className="tasks__item" key={task.id} >
                                    <div className="tasks__item-title">{task.title}</div>
                                    <div className="tasks__item-description">{task.description}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );

        default:
            return null;
    }
};

export default TasksData;