import {useTranslation} from "react-i18next";
import {UtilityPole} from "lucide-react";
import {useEffect} from "react";
import LanguageSelector from "@/components/LanguageSelector.jsx";

const HeaderBar = () => {
    const { t } = useTranslation();

    useEffect(() => {

    }, [])

    return (
        <div className="navbar w-full bg-neutral text-neutral-content justify-between">
            <div className={"flex items-center"}>
                <UtilityPole className={"w-6 h-6 md:w-10 md:h-10 m-2 md:m-5"} size={50} />
                <div>
                    <h1 className={"font-black md:text-3xl capitalize"}>{t('header_title')}</h1>
                    <p className={"hidden md:block font-semibold text-sm md:text-xl"}>{t('header_subtitle')}</p>
                </div>
            </div>
            <div className={"navbar-end"}>
                <LanguageSelector className={"md:mr-5"} />
            </div>
        </div>
    )
}

export default HeaderBar;