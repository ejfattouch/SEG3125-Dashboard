import {useRef, useEffect, forwardRef, useImperativeHandle, useState} from "react";
import {useTranslation} from "react-i18next";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {createRoot} from "react-dom/client";
import {cn} from "@/lib/util.js";

const MapPopUp = ({data}) => {
    const {t} = useTranslation();

    function cleanText(str) {
        try {
            const decoded = decodeURIComponent(escape(str));
            return decoded.replace(/\\'/g, "'");
        } catch {
            return str;
        }
    }

    const estimatedGen = data.estimated_generation_note_2017 !== "NO-ESTIMATION" ? data.estimated_generation_gwh_2017.toLocaleString() + " GWh" : "";

    const decodedData =
        {
            "country": t(`countries.${data.country_long}`),
            "name": cleanText(data.name),
            "type": t(data.primary_fuel.toLowerCase()),
            "capacity_no_mw": Math.round(data.capacity_mw) + " MW",
            "year_built": Math.floor(data.commissioning_year),
            "owner": cleanText(data.owner),
            "estimated_gen" : estimatedGen
        }

    return (
        <div className={"text-sm text-black flex flex-col gap-1 p-2 w-64 max-w-full"}>
            {Object.keys(decodedData).map((key, i) => {
                const value = decodedData[key];
                if (value !== undefined && value !== "" && value !== null) {
                    return (
                        <div key={i}>
                            <span className={"font-semibold"}>{t(key)}: </span>
                            <span className={"text-right break-words"}>{decodedData[key]}</span>
                        </div>)
                }
            })}
        </div>
    )
}


const MapBox = forwardRef((_, ref) => {
    const {i18n} = useTranslation();

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useImperativeHandle(ref, () => ({
        mapbox: mapRef.current,
    }));

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZWZhdHQxMDAiLCJhIjoiY21jdjhqamxyMDg1ejJqb2JtMG91cGFqayJ9.sgOTbraKQflX50pSVJsisQ'
        const initMap = async () => {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/efatt100/cmcv8q0f600z101s41ewdad1k',
                center: [-95, 40],
                zoom: 3,
                minZoom: 2,
                maxZoom: 10,
                projection: 'mercator'
            });

            mapRef.current.on('load', () => {
                mapRef.current.on('mouseenter', 'data-driven-circles', () => {
                   mapRef.current.getCanvas().style.cursor = 'pointer';
                });
                mapRef.current.on('mouseleave', 'data-driven-circles', () => {
                    mapRef.current.getCanvas().style.cursor = '';
                });
            })

            mapRef.current.on('click', 'data-driven-circles', (e) => {
                const feature = e.features[0];
                const props = feature.properties;

                const popupNode = document.createElement("div");
                const root = createRoot(popupNode);
                root.render(<MapPopUp data={props} />);

                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setDOMContent(popupNode)
                    .addTo(mapRef.current);
            });

        }
        initMap();
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const setLanguage = () => {
            const labelLayers = [
                'state-label',
                'country-label',
                'settlement-major-label',
                'settlement-minor-label',
            ]

            labelLayers.forEach(l => {
                mapRef.current.setLayoutProperty(l, 'text-field', [
                    'get',
                    `name_${i18n.language}`
                ])
            })
        }

        if (!map.loaded()) {
            map.on('load', () => {
                setLanguage();
            })
        }
        else {
            setLanguage();
        }

    }, [i18n.language])

    return (
            <div ref={mapContainerRef} className={cn("w-full h-[50vh] rounded-box border-border border-2")} />
    )
});

export default MapBox;
