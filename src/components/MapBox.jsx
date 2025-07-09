import {useRef, useEffect} from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {createRoot} from "react-dom/client";

const MapPopUp = ({data}) => {
    return (
        <div className={"!text-black"}>
            <p>{JSON.stringify(data, null, 2)}</p>
        </div>
    )
}


const PowerPlantMap = () => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZWZhdHQxMDAiLCJhIjoiY21jdjhqamxyMDg1ejJqb2JtMG91cGFqayJ9.sgOTbraKQflX50pSVJsisQ'
        const initMap = async () => {
            const config = {
                version: '1.3.0',
                layers: [
                    {
                        type: 'cartodb',
                        options: {
                            sql: 'SELECT * FROM powerwatch_data_20180102',
                            cartocss: '#layer { marker-fill: #FF6600; marker-width: 6; }',
                            cartocss_version: '2.3.0',
                        },
                    },
                ],
            };

            const response = await fetch('https://wri-rw.carto.com/api/v1/map', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            const tilejson = await response.json();
            const tileUrl = `https://cartocdn-gusc.global.ssl.fastly.net/wri-rw/api/v1/map/${tilejson.layergroupid}/{z}/{x}/{y}.mvt`;

            document.getElementById("metadata").innerHTML = JSON.stringify(tileUrl, null, 2);

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

    return (
        <>
            <div id="metadata-container">
                <pre id="metadata">
                    Hello (part of the) World
                </pre>
            </div>
            <div ref={mapContainerRef} className="w-full h-200 bg-gray-400" />
        </>
        )
};

export default PowerPlantMap;
