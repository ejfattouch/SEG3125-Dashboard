import { useTranslation } from "react-i18next";
import {useState} from "react";
import {Languages} from "lucide-react";
import {cn} from "@/lib/util.js";

const LanguageSelector = ({ className }) => {
    const flags = {
        en: '🇬🇧',
        fr: '🇫🇷'
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
            <div tabIndex="0" role="button" className="btn btn-ghost border-base-200 uppercase flex w-fit gap-4 px-3">
                <Languages className={"h-6"}/>
                <p>{flags[currentLang]} {currentLang}</p>
            </div>
            <ul
                tabIndex="0"
                className="menu menu-lg dropdown-content text-base-content bg-base-100 rounded-box z-1 mt-1 w-fit p-2 shadow">
                <li>
                    <a
                        className={"text-nowrap"}
                        onClick={() => handleChange('en')}
                    >
                        🇬🇧 EN
                    </a>
                </li>
                <li>
                    <a
                        className={"text-nowrap"}
                        onClick={() => handleChange('fr')}
                    >
                        🇫🇷 FR
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default LanguageSelector;