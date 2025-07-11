import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import {cn} from "@/lib/util.js";

const getVisiblePages = (current, max) => {
    const pages = [];

    if (max <= 5) {
        for (let i = 1; i <= max; i++) pages.push(i);
    } else if (current <= 3) {
        pages.push(1, 2, 3, 4, 5);
    } else if (current >= max - 2) {
        for (let i = max - 4; i <= max; i++) pages.push(i);
    } else {
        pages.push(current - 2, current - 1, current, current + 1, current + 2);
    }

    return pages;
};

const DataPagination = ({className, maxPage, currentPage, setCurrentPage}) => {
    const visiblePages = getVisiblePages(currentPage, maxPage);

    return (
        <div className={cn("join [&_*]:shadow-none", className)}>
            {/* First Page */}
            <button
                className="join-item btn btn-sm btn-neutral"
                onClick={() => setCurrentPage(1)}
            >
                <ChevronsLeft className={"w-4 h-4"}/>
            </button>
            {/* Prev Page */}
            <button
                className="join-item btn btn-sm btn-neutral"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
                <ChevronLeft className={"w-4 h-4"} />
            </button>

            {/* Page Numbers */}
            {visiblePages.map((page, i) => (
                <button
                    key={i}
                    className={cn("join-item btn btn-sm btn-neutral", page === currentPage && "btn-disabled text-neutral/80")}
                    onClick={() => setCurrentPage(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}

            {/* Next Page */}
            <button
                className="join-item btn btn-sm btn-neutral"
                onClick={() => setCurrentPage((prev) =>
                    prev < maxPage ? prev + 1 : prev
                )}
            >
                <ChevronRight className={"w-4 h-4"}/>
            </button>
            {/* Last Page */}
            <button
                className="join-item btn btn-sm btn-neutral"
                onClick={() => setCurrentPage(maxPage)}
            >
                <ChevronsRight className={"w-4 h-4"} />
            </button>
        </div>
    )
}

export default DataPagination;