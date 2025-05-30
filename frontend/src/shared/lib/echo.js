import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const createEcho = () => {
    return new Echo({
        broadcaster: "pusher",
        forceTLS: false,
        disableStats: true,
        enabledTransports: ["ws", "wss"],
        withCredentials: true,
        authEndpoint: `${import.meta.env.VITE_API_URL}`,
    })
}