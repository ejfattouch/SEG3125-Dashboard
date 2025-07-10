import {useTranslation} from "react-i18next";
import {Zap, Battery, Funnel, MapPin} from 'lucide-react';
import StatCard from "@/components/StatCard.jsx";
import {cn} from "@/lib/util.js";
import MapBox from "@/components/custom/MapBox.jsx";
import {useEffect, useRef, useState} from "react";
import DataGrid from "@/components/custom/DataGrid.jsx";

const MainPageContent = () => {
    const {t} = useTranslation();

    const [selectedTab, setSelectedTab] = useState("grid");
    const mapRef = useRef(null);

    const [summary, setSummary] = useState({
        totalCapacity: 0,
        totalPlants: 0,
        countries: new Set(),
        fuels: new Set()
    });

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


                    <div className={"card card-border bg-base-100 w-full"}>
                        <div className={"card-body "}>
                            <div className={cn(selectedTab === "grid" ? "block" : "hidden")}>
                                <div>
                                    <h1 className={"card-title font-black text-2xl"}>{t("energy_gen_db")}</h1>
                                    <h1 className={"font-light text-lg"}>{t("comprehensive_data")}</h1>
                                </div>
                                <DataGrid onSummaryReady={setSummary} />
                            </div>

                            <div className={cn(selectedTab === "map" ? "block" : "hidden")}>
                                <div className={"mb-4"}>
                                    <h1 className={"card-title font-black text-2xl"}>
                                        {t("global_energy_map")}
                                        <MapPin className={"w-7 h-7 text-neutral/80"} />
                                    </h1>
                                    <h1 className={"font-light text-lg"}>{t("interactive_viz")}</h1>
                                </div>
                                <MapBox ref={mapRef} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default MainPageContent;