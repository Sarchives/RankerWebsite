import { useEffect } from 'preact/hooks'
import { useNavigate } from "react-router-dom"

export function Callback() {
    let navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search.substring(1));
        fetch(import.meta.env.VITE_API_URL + "/token", {
            headers: new Headers({
                "Code": params.get("code") ?? ""
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.access_token) {
                    localStorage.setItem("token", result.access_token);
                }
                navigate(-2);
            });

    }, [])

    return (
        <>
            <h1>Please wait...</h1>
        </>
    )
}
