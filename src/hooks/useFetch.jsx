import Papa from "papaparse";

const useFetch = () => {
    const fetchCsvData = async (filePath, callback) => {
        try {
            const response = await fetch(filePath);
            const text = await response.text();
            const parsed = Papa.parse(text, { header: true });
            if (callback) callback(parsed.data);
            return parsed.data;
        }
        catch (error) {
            console.error("Failed to fetch csv: ", error);
            return [];
        }
    }

    return { fetchCsvData }
}

export default useFetch;