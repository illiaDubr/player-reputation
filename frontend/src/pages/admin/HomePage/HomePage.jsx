import React from 'react';
import Button from "@shared/ui/SubmitButton";
import {useStore} from "@app/providers";

const HomePage = () => {
    const { store } = useStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await store.download();
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "backup_file.sql";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Ошибка при скачивании файла:", error);
        }
    }

    return (
        <div style={{color: "white"}}>
            Админка
            <form method="GET" className="" onSubmit={handleSubmit}>
                <Button>
                    Скачать
                </Button>
            </form>
        </div>
    )
}

export default HomePage;