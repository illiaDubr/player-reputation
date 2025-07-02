import React from 'react';
import Button from "@shared/ui/SubmitButton";
import {useStore} from "@app/providers";
import {Helmet} from "react-helmet-async";

const HomePage = () => {
    const { store } = useStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await store.download();

            if (!response || !response.data) {
                console.error("Пустой ответ от сервера:", response);
                return;
            }

            const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "backup_file.sql";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Ошибка при скачивании файла:", error.response || error);
        }
    };


    return (
        <>
            <Helmet>
                <title>
                    Админ Панель
                </title>
            </Helmet>
            <div style={{color: "white"}}>
                Админка
                <form method="GET" className="" onSubmit={handleSubmit}>
                    <Button>
                        Скачать
                    </Button>
                </form>
            </div>
        </>
    )
}

export default HomePage;