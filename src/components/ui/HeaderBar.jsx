import {useTranslation} from "react-i18next";

const HeaderBar = () => {
    const { t } = useTranslation();

    return (
        <div className="navbar bg-neutral text-neutral-content">
            <h1>{t('header_title')}</h1>
        </div>
    )
}

export default HeaderBar;