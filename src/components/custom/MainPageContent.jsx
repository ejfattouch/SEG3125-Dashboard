import {useTranslation} from "react-i18next";
import {Zap, Battery, Funnel} from 'lucide-react';
import StatCard from "@/components/StatCard.jsx";
import {cn} from "@/lib/util.js";
import MapBox from "@/components/custom/MapBox.jsx";
import {useEffect, useRef, useState} from "react";
import DataGrid from "@/components/custom/DataGrid.jsx";
import useFetch from "@/hooks/useFetch.jsx";
import BarChartCapacityByEnergyType from "@/components/charts/BarChartCapacityByEnergyType.jsx";
import BarChartCapacityByCountryCompare from "@/components/charts/BarChartCapacityByCountryCompare.jsx";

const MainPageContent = () => {
    const {t} = useTranslation();
    const {fetchCsvData} = useFetch();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState({countries: [], fuelTypes: []});

    const [selectedTab, setSelectedTab] = useState("grid");
    const mapRef = useRef(null);

    const [summary, setSummary] = useState({
        totalCapacity: 0,
        totalPlants: 0,
        countries: new Set(),
        fuels: new Set()
    });

    // Grab data once on page load
    useEffect(() => {
        fetchCsvData("/data/global_power_plant_database.csv", setData);
    }, [])

    // Prase data on data change
    useEffect(() => {
        let total_capacity = 0;
        const countryList = new Set();
        const fuelList = new Set();

        for (const dataObj of data) {
            const capacity = parseFloat(dataObj.capacity_mw);
            const country = dataObj.country_long;
            const fuel = dataObj.primary_fuel;

            // Data has already been verified, if issues arise add data validation here
            total_capacity += capacity;
            countryList.add(country);
            fuelList.add(fuel);
        }

        setFilterData({countries: [...countryList], fuelTypes: [...fuelList]});

        if (data.length > 0) {
            setSummary({
                totalCapacity: Math.round(total_capacity),
                totalPlants: data.length,
                countries: countryList,
                fuels: fuelList,
            })
        }
    }, [data]);

    // This is to avoid a small bug related to hiding a mapbox canvas
    useEffect(() => {
        if (selectedTab === "map" && mapRef.current?.mapbox) {
            mapRef.current.mapbox.resize();
        }
    }, [selectedTab]);


    return (
        <section className={"py-10 grid grid-cols-1 px-10 items-center gap-7"}>
            <h1>{t("global_data")}</h1>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10"}>
                <StatCard
                    title_text={t("total_power_plants")}
                    data_text={summary.totalPlants.toLocaleString()}
                    sub_text={t('across_n_countries', {n:summary.countries.size})}
                    Icon={Zap}
                />
                <StatCard
                    title_text={t("total_capacity")}
                    data_text={summary.totalCapacity.toLocaleString() + " MW"}
                    sub_text={t('combined_gen_capacity')}
                    Icon={Battery}
                />
                <StatCard
                    title_text={t("energy_types")}
                    data_text={summary.fuels.size}
                    sub_text={t('diff_energy_sources')}
                    Icon={Funnel}
                />
            </div>
            <div>
                <div className="tabs tabs-box grid grid-cols-2 font-bold">
                    <input
                        type="radio" name="tabs_data_container" className="tab"
                        onClick={() => setSelectedTab("grid")}
                        aria-label={t("data_grid")}
                        defaultChecked
                    />
                    <input
                        type="radio" name="tabs_data_container" className="tab"
                        aria-label={t("interactive_map")}
                        onClick={() => setSelectedTab("map")}
                    />
                </div>

                <div className={"mt-5"}>

                    <section className={cn("flex-col gap-5", selectedTab === "grid" ? "flex" : "hidden")}>
                        <div className={"card card-border border-2 border-border bg-base-100 w-full"}>
                            <div className={"card-body"}>
                                <div>
                                    <h1 className={"card-title font-black text-2xl"}>{t("energy_gen_db")}</h1>
                                    <h1 className={"font-light text-lg"}>{t("comprehensive_data")}</h1>
                                </div>
                                <DataGrid data={data} filterData={filterData} />
                            </div>
                        </div>
                        <div className={"card card-border border-2 border-border bg-base-100 w-full"}>
                            <div className={"card-body"}>
                                <div>
                                    <h1 className={"card-title font-black text-2xl"}>{t("data_viz")}</h1>
                                    <h1 className={"font-light text-lg"}>{t("interactive_charts")}</h1>
                                    <BarChartCapacityByEnergyType data={data} filterData={filterData} />
                                    <BarChartCapacityByCountryCompare data={data} filterData={filterData} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={cn(selectedTab === "map" ? "block" : "hidden")}>
                        <div className={"card card-border border-2 border-border bg-base-100 w-full"}>
                            <div className={"card-body "}>
                                <div className={"mb-4"}>
                                    <h1 className={"card-title font-black text-2xl"}>
                                        {t("global_energy_map")}
                                    </h1>
                                    <h1 className={"font-light text-lg"}>{t("interactive_viz")}</h1>
                                </div>
                                <MapBox ref={mapRef} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </section>
    )
}

export default MainPageContent;