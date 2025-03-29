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
        id: 1,
        img: "danger_triangle",
        text: "Сообщить об ошибке метки",
        modal: "openReportModal",
    },
    {
        id: 2,
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