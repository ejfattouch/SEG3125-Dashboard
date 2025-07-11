import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ChartContainer, ChartTooltip} from "@/components/ui/chart.jsx";
import ChartTooltipContent from "@/components/ChartTooltipContent.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

const BarChartCapacityByEnergyType = ({data, filterData}) => {
    const {t} = useTranslation();

    const [dataSet, setDataSet] = useState({});
    const [selectCountry, setSelectCountry] = useState("all");

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Make an template dict storing capacity by energy type initalized to 0
        const fuelTemplate = Object.fromEntries(filterData.fuelTypes.map(f => [f, 0]))
        const fullDataSet = {
            all: fuelTemplate,
            ...Object.fromEntries(filterData.countries.map(k => [k, {...fuelTemplate}]))
        }

        for (const dataObj of data) {
            const capacity = parseFloat(dataObj.capacity_mw);
            const country = dataObj.country_long;
            const fuel = dataObj.primary_fuel;

            fullDataSet.all[fuel] += capacity;
            fullDataSet[country][fuel] += capacity;
        }

        setDataSet(fullDataSet);
    }, [filterData]);


    const getTypeColor =  (type) => {
        switch (type) {
            case "Nuclear":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "Hydro":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "Wind":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "Solar":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "Gas":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            case "Coal":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            case "Oil":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            case "Geothermal":
                return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
            case "Biomass":
                return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
            case "Waste":
                return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
            case "Wave and Tidal":
                return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
            case "Storage":
                return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
            case "Cogeneration":
                return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
            case "Petcoke":
                return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    const loading = dataSet === null || Object.keys(dataSet).length === 0;

    return (
        <div className={"card card-border border-1 border-border bg-base-100 mt-4"}>
            <div className={"card-body"}>
                <div className={"flex justify-between"}>
                    <h2 className="card-title text-xl">{t("cap_v_type_title")}</h2>
                    <Select value={selectCountry} onValueChange={setSelectCountry}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder={t("filter_by_country")} />
                        </SelectTrigger>
                        <SelectContent className={"max-h-60 overflow-y-auto"} align="end">
                            <SelectItem value="all">{t("all_countries")}</SelectItem>
                            {filterData.countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {t(`countries.${country}`) || country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <ChartContainer
                    config={{
                        capacity: {
                            label: t("capacity"),
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-[250px] w-full"
                >
                { loading ? (
                    <div className="flex h-[250px] w-full items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary" />
                    </div>) :
                        (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={Object.entries(dataSet[selectCountry]).map(([type, capacity]) => ({ type: t(type.toLowerCase()), capacity: Math.round(capacity) }))}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" angle={-45} textAnchor="end" height={60} fontSize={10} interval={0} />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="capacity">
                                {Object.entries(dataSet.all).map(([type]) => (
                                    <Cell
                                        key={type}
                                        className={getTypeColor(type)}
                                        fill={"currentColor"}
                                    />
                                    ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                </ChartContainer>
            </div>
        </div>
    )
}

export default BarChartCapacityByEnergyType;