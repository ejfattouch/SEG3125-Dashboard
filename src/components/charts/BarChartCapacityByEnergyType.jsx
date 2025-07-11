import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ChartContainer, ChartTooltip} from "@/components/ui/chart.jsx";
import ChartTooltipContent from "@/components/charts/ChartTooltipContent.jsx";
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
                return "text-red-800"
            case "Hydro":
                return "text-blue-800"
            case "Wind":
                return "text-green-800"
            case "Solar":
                return "text-yellow-800"
            case "Gas":
                return "text-orange-800"
            case "Coal":
                return "text-gray-800"
            case "Oil":
                return "text-purple-800"
            case "Geothermal":
                return "text-pink-800"
            case "Biomass":
                return "text-emerald-800"
            case "Waste":
                return "text-amber-800"
            case "Wave and Tidal":
                return "text-cyan-800"
            case "Storage":
                return "text-indigo-800"
            case "Cogeneration":
                return "text-teal-800"
            case "Petcoke":
                return "text-slate-800"
            default:
                return "text-gray-800"
        }
    }

    const loading = dataSet === null || Object.keys(dataSet).length === 0;

    return (
        <div className={"card card-border border-1 border-border  mt-4"}>
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
                    className="h-[400px] w-full"
                >
                { loading ? (
                    <div className="flex h-[400px] w-full items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"/>
                    </div>) :
                        (
                    <ResponsiveContainer width="100%"height="100%">
                        <BarChart
                            data={Object.entries(dataSet[selectCountry]).map(([type, capacity]) => ({ type: t(type.toLowerCase()), capacity: Math.round(capacity) }))}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="type"angle={-45} textAnchor="end"height={60} fontSize={10} interval={0} />
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