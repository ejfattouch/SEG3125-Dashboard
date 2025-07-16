import React, {useEffect} from 'react';
import HeaderBar from "@/components/custom/HeaderBar.jsx";
import MainPageContent from "@/components/custom/MainPageContent.jsx";
import {useTranslation} from "react-i18next";

function App() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        document.title = t('app.title')
    }, [i18n.language, t]);

    return (
        <main className="bg-base-200/40 min-h-screen">
            <HeaderBar/>
            <div className={"container mx-auto"}>
                <MainPageContent/>
            </div>
            <footer className={"text-neutral pb-5"}>
                <p className="text-center text-[10px] sm:text-lg">
                    © {t("copyright_ej")}
                    <a href={"https://datasets.wri.org/datasets/global-power-plant-database?map=eyJ2aWV3U3RhdGUiOnsibGF0aXR1ZGUiOjIuODQyMTcwOTQzMDQwNDAxZS0xNCwibG9uZ2l0dWRlIjotMzcuODE0NzM0Njk1ODQ2MzcsInpvb20iOjAuNzM4MDkyMjM5MTYyNDk5NCwiYmVhcmluZyI6MCwicGl0Y2giOjAsInBhZGRpbmciOnsidG9wIjowLCJib3R0b20iOjAsImxlZnQiOjAsInJpZ2h0IjowfX0sImJhc2VtYXAiOiJsaWdodCIsImJvdW5kYXJpZXMiOmZhbHNlLCJsYWJlbHMiOiJkYXJrIiwiYWN0aXZlTGF5ZXJHcm91cHMiOlt7ImRhdGFzZXRJZCI6IjUzNjIzZGZkLTNkZjYtNGYxNS1hMDkxLTY3NDU3Y2RiNTcxZiIsImxheWVycyI6WyIyYTY5NDI4OS1mZWM5LTRiZmUtYTZkMi01NmMzODY0ZWMzNDkiXX1dLCJib3VuZHMiOnsiYmJveCI6bnVsbCwib3B0aW9ucyI6e319LCJsYXllcnNQYXJzZWQiOltbIjJhNjk0Mjg5LWZlYzktNGJmZS1hNmQyLTU2YzM4NjRlYzM0OSIseyJ2aXNpYmlsaXR5Ijp0cnVlLCJhY3RpdmUiOnRydWUsIm9wYWNpdHkiOjEsInpJbmRleCI6MTF9XV19"}>
                        WRI
                    </a>
                </p>
            </footer>
        </main>
    )
}

export default App
