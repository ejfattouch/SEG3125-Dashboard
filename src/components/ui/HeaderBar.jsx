import {useTranslation} from "react-i18next";
import {UtilityPole} from "lucide-react";
import {useEffect} from "react";
import LanguageSelector from "@/components/LanguageSelector.jsx";

const HeaderBar = () => {
    const { t } = useTranslation();

    useEffect(() => {

    }, [])

    return (
        <div className="navbar bg-neutral text-neutral-content">
            <div className={"navbar-start"}>
                <UtilityPole className={"h-full w-auto m-5"} size={50} />
                <div>
                    <h1 className={"font-black text-3xl capitalize"}>{t('header_title')}</h1>
                    <p className={"font-semibold text-xl"}>{t('header_subtitle')}</p>
                </div>
            </div>
            <div className={"navbar-end"}>
                <LanguageSelector className={"mr-5"} />
            </div>
        </div>
    )
}

export default HeaderBar;