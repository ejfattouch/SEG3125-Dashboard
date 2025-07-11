import {useEffect, useRef, useState} from "react";
import {Search, ChevronUp, ChevronDown} from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useTranslation} from "react-i18next";
import DataPagination from "@/components/DataPagination.jsx";


const DataGrid = ({data, filterData}) => {
    const {t} = useTranslation();

    const [searchTerm, setSearchTerm] = useState("")
    const [filterCountry, setFilterCountry] = useState("all");
    const [filterFuelType, setFilterFuelType] = useState("all")

    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop=0;
        }
    }, [currentPage])

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

    const translateType = (type) => {
        const typeKey = type.toLowerCase().replace(/\s+/g, " ")
        return t(typeKey) || type
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
        setCurrentPage(1);
    }

    const getSortIcon = (field) => {
        if (sortField !== field) {
            return <ChevronUp className="h-4 w-4 opacity-30" />
        }
        return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
    }

    const sortedAndFilteredGenerators = data
        .filter((generator) => {
            const matchesSearch = generator.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = filterFuelType === "all" || generator.primary_fuel === filterFuelType
            const matchesCountry = filterCountry === "all" || generator.country_long === filterCountry

            return matchesSearch && matchesType && matchesCountry
        })
        .sort((a, b) => {
            if (!sortField) return 0

            let aValue
            let bValue

            switch (sortField) {
                case "name":
                    aValue = a.name.toLowerCase()
                    bValue = b.name.toLowerCase()
                    break
                case "country":
                    aValue = a.country_long.toLowerCase()
                    bValue = b.country_long.toLowerCase()
                    break
                case "type":
                    aValue = a.primary_fuel.toLowerCase()
                    bValue = b.primary_fuel.toLowerCase()
                    break
                case "capacity":
                    aValue = parseFloat(a.capacity_mw);
                    bValue = parseFloat(b.capacity_mw);
                    break
                default:
                    return 0
            }

            if (aValue < bValue) {
                return sortDirection === "asc" ? -1 : 1
            }
            if (aValue > bValue) {
                return sortDirection === "asc" ? 1 : -1
            }
            return 0
        })

    const maxPage = Math.floor(sortedAndFilteredGenerators.length / itemsPerPage) + 1;

    return (
        <div className={"space-y-4"}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t("search_placeholder")}
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}}
                        className="pl-10"
                    />
                </div>

                <Select value={filterFuelType} onValueChange={(value) => {setFilterFuelType(value); setCurrentPage(1)}}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder={t("filter_by_type")} />
                    </SelectTrigger>
                    <SelectContent className={"max-h-60 overflow-y-auto"} align="end">
                        <SelectItem value="all">{t("all_types")}</SelectItem>
                        {filterData.fuelTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {translateType(type)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={filterCountry} onValueChange={(value) => {setFilterCountry(value); setCurrentPage(1)}}>
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
            <span className="text-sm text-muted-foreground ml-1">{t("showing")} {((currentPage - 1) * itemsPerPage + 1).toLocaleString()}-{Math.min(currentPage * itemsPerPage, sortedAndFilteredGenerators.length).toLocaleString()} {t("of")} {sortedAndFilteredGenerators.length.toLocaleString()}</span>
            <div className={"relative rounded-md border mt-2"}>
                <Table
                    containerClassName={"h-fit max-h-200 overflow-y-auto"}
                    ref={scrollContainerRef}
                >
                    <TableHeader className={"sticky top-0 drop-shadow-sm bg-base-100"}>
                        <TableRow>
                            <TableHead
                                className="cursor-pointer hover:bg-muted/50 select-none"
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{t("name")}</span>
                                    {getSortIcon("name")}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-muted/50 select-none"
                                onClick={() => handleSort("country")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{t("country")}</span>
                                    {getSortIcon("country")}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-muted/50 select-none"
                                onClick={() => handleSort("type")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{t("type")}</span>
                                    {getSortIcon("type")}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-muted/50 select-none"
                                onClick={() => handleSort("capacity")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{t("capacity")}</span>
                                    {getSortIcon("capacity")}
                                </div>
                            </TableHead>
                            <TableHead>{t("year_built")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedAndFilteredGenerators
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((generator, i) => (
                            <TableRow key={i}>
                                <TableCell className={"font-medium"}>{generator.name}</TableCell>
                                <TableCell>{t(`countries.${generator.country_long}`)}</TableCell>
                                <TableCell>
                                    <Badge className={getTypeColor(generator.primary_fuel)}>{translateType(generator.primary_fuel)}</Badge>
                                </TableCell>
                                <TableCell className="font-mono">{Math.round(generator.capacity_mw).toLocaleString()}</TableCell>
                                <TableCell>{Math.floor(generator.commissioning_year) || "N/A"}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {sortedAndFilteredGenerators.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">{t("no_results")}</div>
                )}
            </div>

            {maxPage > 1 && (
                <div className="flex w-full items-center justify-center">
                    <DataPagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        maxPage={maxPage}
                    />
                </div>
            )}
        </div>
    )
}

export default DataGrid;