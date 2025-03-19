export const editModalData = [
    {
        name: "report",
        title: "Отправить репорт",
    },
    {
        name: "edit",
        title: "Изменить данные",
    },
]

export const editData = [
    {
        img: "danger_triangle",
        text: "Репорт метки",
        modal: "openReportModal",
    },
    {
        img: "pen",
        text: "",
        modal: "openEditModal",
    }
]

export const editFormData = [
    {
        name: "report",
        method: "POST",
        button: "Отправить",
    },
    {
        name: "edit",
        method: "PATCH",
        button: "Изменить",
    }
]