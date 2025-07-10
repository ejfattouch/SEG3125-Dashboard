import {useTranslation} from "react-i18next";
import { Zap, Battery, Funnel } from 'lucide-react';
import StatCard from "@/components/StatCard.jsx";
import {cn} from "@/lib/util.js";
import MapBox from "@/components/ui/MapBox.jsx";
import {useEffect, useRef, useState} from "react";

const DataContainer = () => {
    const {t} = useTranslation();

    const [selectedTab, setSelectedTab] = useState("grid");
    const mapRef = useRef(null);

    useEffect(() => {
        if (selectedTab === "map" && mapRef.current?.mapbox) {
            mapRef.current.mapbox.resize();
        }
    }, [selectedTab]);


    return (
        <section className={"py-10 grid grid-cols-1 px-10 items-center gap-7"}>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10"}>
                <StatCard
                    title_text={t("total_power_plants")}
                    data_text={12}
                    sub_text={t('across_n_countries', {n:15})}
                    Icon={Zap}
                />
                <StatCard
                    title_text={t("total_capacity")}
                    data_text={"20 MW"}
                    sub_text={t('combined_gen_capacity')}
                    Icon={Battery}
                />
                <StatCard
                    title_text={t("energy_types")}
                    data_text={6}
                    sub_text={t('diff_energy_sources')}
                    Icon={Funnel}
                />
            </div>
            <div>
                <div className="tabs tabs-box grid grid-cols-2 font-bold">
                    <input
                        type="radio"
                        name="tabs_data_container"
                        className="tab"
                        onClick={() => setSelectedTab("grid")}
                        aria-label={t("data_grid")}
                        defaultChecked
                    />
                    <input
                        type="radio"
                        name="tabs_data_container"
                        className="tab"
                        onClick={() => setSelectedTab("map")}
                        aria-label={t("interactive_map")}
                    />
                </div>

                <div className={"mt-5"}>
                    <div className={cn(selectedTab === "grid" ? "block" : "hidden")}>
                        <p className={"h-500"}>Data Grid</p>
                    </div>
                    <div className={cn(selectedTab === "map" ? "block" : "hidden")}>
                        <div className={"card card-border bg-base-100 w-full"}>
                            <div className={"card-body "}>
                                <div>
                                    <h1 className={"card-title font-black text-2xl"}>{t("global_energy_map")}</h1>
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

export default DataContainer;