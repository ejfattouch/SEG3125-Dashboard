import { useTranslation } from "react-i18next";
import {useState} from "react";
import {Languages} from "lucide-react";
import {cn} from "@/lib/util.js";

import GbFlag from "@/assets/flags/gb.png"
import FrFlag from "@/assets/flags/fr.png"

const LanguageSelector = ({ className }) => {
    const flags = {
        en: GbFlag,
        fr: FrFlag
    }

    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);

    const handleChange = (lang) => {
        if (lang !== currentLang) {
            i18n.changeLanguage(lang);
            setCurrentLang(lang);
        }
    }

    return (
        <div className={cn("dropdown dropdown-end", className)}>
            <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost border-base-200 uppercase flex w-fit gap-3 px-3"
            >
                <Languages className={"h-6"}/>
                <p className={"text-center text-lg"}>
                    <img className={"inline-block w-6 mb-1 mr-2"} src={flags[currentLang]} alt={"flag"} />
                    {currentLang}
                </p>
            </div>
            <ul
                tabIndex="0"
                className="menu menu-lg dropdown-content text-neutral bg-base-100 font-bold rounded-box z-1 mt-1 w-fit p-2 shadow">
                <li>
                    <button
                        className={"text-nowrap"}
                        onClick={() => handleChange('en')}
                    >
                        <img className={"w-6"} src={GbFlag} alt={"English"} />EN
                    </button>
                </li>
                <li>
                    <button
                        className={"text-nowrap"}
                        onClick={() => handleChange('fr')}
                    >
                        <img className={"w-6"} src={FrFlag} alt={"French"} />FR
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default LanguageSelector;