import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ChartContainer, ChartTooltip} from "@/components/ui/chart.jsx";
import ChartTooltipContent from "@/components/ChartTooltipContent.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Plus, Minus} from "lucide-react";

const BarChartCapacityByCountryCompare = ({data, filterData}) => {
    const {t} = useTranslation();

    const [dataSet, setDataSet] = useState({});
    const [selectCountry, setSelectCountry] = useState("");
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    const maxCountries = 5;

    useEffect(() => {
        if (!data || data.length === 0) return;
        if (!filterData || filterData.length === 0) return;

        // Create an emptyDataset
        const emptyDataSet = {
            ...Object.fromEntries(filterData.countries.map(k => [k, 0]))
        }

        // Start filling the dataset
        for (const dataObj of data) {
            const country = dataObj.country_long;
            const capacity = parseFloat(dataObj.capacity_mw);
            emptyDataSet[country] += capacity;
        }

        setDataSet(emptyDataSet);

        // Number of initial elements in the dataset
        const numIndexes = Math.min(3, maxCountries);
        const indexArr = [Math.floor(Math.random() * filterData.countries.length)] // Generate initial index
        for (let i = 1; i < numIndexes; i++) {
            let index;
            do {
                index = Math.floor(Math.random() * filterData.countries.length);
            }
            while (indexArr.includes(index));
            indexArr[i] = index;
        }

        // Grab the countries associated to these indices and use them as initial data set
        setSelectedCountries();
        const randomSelected = indexArr.map(index => {
            const country = filterData.countries[index];
            return {
                country,
                capacity: Math.round(emptyDataSet[country]),
            };
        });

        setSelectedCountries(randomSelected);
        setLoading(false);
    }, [filterData]);

    const addCountry = () => {
        if (!selectCountry || selectedCountries.length >= maxCountries) return;

        const alreadyExists = selectedCountries.some(item => item.country === selectCountry);
        if (alreadyExists) return;

        const capacity = dataSet[selectCountry];
        if (capacity === undefined) return;

        setSelectedCountries(prev => [...prev,
            {country: selectCountry, capacity: Math.round(capacity)}]);
    }

    const removeLastCountry = () => {
        setSelectedCountries(prev => prev.slice(0, -1));
    };

    const getBarColor = (index) => {
        const colors = [
            "text-red-800",
            "text-blue-800",
            "text-green-800",
            "text-yellow-800",
            "text-orange-800",
        ];
        return colors[index] || "text-gray-800";
    };

    return (
        <div className={"card card-border border-1 border-border bg-base-100 mt-4"}>
            <div className={"card-body"}>
                <div className={"flex justify-between"}>
                    <h2 className="card-title text-xl">{t("cap_v_country_title")}</h2>
                    <div className={"flex gap-2"}>
                        <Select value={selectCountry} onValueChange={setSelectCountry}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder={t("chose_a_country")} />
                            </SelectTrigger>
                            <SelectContent className={"max-h-60 overflow-y-auto"} align="end">
                                {filterData.countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                        {t(`countries.${country}`) || country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            size="icon"
                            className={"shrink-0 bg-transparent"}
                            onClick={addCountry}
                            disabled={selectedCountries.length >= maxCountries}
                        >
                            <Plus className={"h-4 w-4"}></Plus>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className={"shrink-0 bg-transparent"}
                            onClick={removeLastCountry}
                            disabled={selectedCountries.length === 0}
                        >
                            <Minus className={"h-4 w-4"}></Minus>
                        </Button>
                    </div>
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
                                <span className="loading loading-spinner loading-lg text-primary" />
                            </div>) :
                        (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={selectedCountries.length > 0 ? selectedCountries : [{country: "", capacity: 0}]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="country" angle={-45} textAnchor="end" height={60} fontSize={10} interval={0} />
                                    <YAxis />
                                    {selectedCountries.length > 0 && (
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    )}
                                    <Bar dataKey="capacity" fill={"var(--color-capacity)"} barSize={100}>
                                        {selectedCountries.map((entry, index) => (
                                            <Cell
                                                key={entry.country}
                                                className={getBarColor(index)}
                                                fill={"currentColor"}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                                {selectedCountries.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-muted-foreground">{t("no_data_selected")}</span>
                                    </div>
                                )}
                            </ResponsiveContainer>
                        )}
                </ChartContainer>
            </div>
        </div>
    )
}

export default BarChartCapacityByCountryCompare;