import React from "react";
import {PLAYER_LIST} from "../../../../utils/RoleData.js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const chunkArray = (array, size) => {
    return array.reduce((acc, _, index) => {
        if (index % size === 0) {
            acc.push(array.slice(index, index + size));
        }
        return acc;
    }, []);
};

gsap.registerPlugin(ScrollTrigger);

const TasksData = ({tasksType}) => {
    const groupedTasks = chunkArray(PLAYER_LIST, 2);

    const sectionRef = React.useRef(null);
    const itemsRef = React.useRef([]);

    React.useEffect(() => {
        const section = sectionRef.current;
        const items = itemsRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${items.length * 100}%`, // Длина анимации зависит от количества блоков
                pin: true, // Фиксируем секцию
                scrub: 1, // Плавная прокрутка
                anticipatePin: 1,
            },
        });
        items.forEach((item, index) => {
            tl.fromTo(
                item,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5 },
                index * 0.5 // Каждая анимация запускается с небольшим отставанием
            );
        });
    }, [])

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
                        <div className="tasks__content" key={index}>
                            {taskGroup.map((task) => (
                                <div className="tasks__item" key={task.id}>
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