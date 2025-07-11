import {useTranslation} from "react-i18next";

const ChartTooltipContent = ({active, payload, label}) => {
    const { t, i18n } = useTranslation();

    if (!active || !payload || payload.length === 0) return null;

    return (
        <div className={"rounded bg-base-100 px-3 py-2 text-sm shadow"}>
            <div className="font-semibold capitalize">{t(label.toLowerCase())}</div>
            {payload.map((entry, i) => (
                <div key={i} className="text-base-content">
                    {t(entry.name)}: {entry.value.toLocaleString(i18n.language)}
                </div>
            ))}
        </div>
    )
}

export default ChartTooltipContent;