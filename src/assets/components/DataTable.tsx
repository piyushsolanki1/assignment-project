import React, { useState } from "react";

export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}

export type DataTableVariant = "default" | "compact" | "striped" | "bordered";


export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (rows: T[]) => void;
    variant?: DataTableVariant;
    rowsPerPage?: number;
}

function DataTable<T extends { id: string | number }>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
    variant = "default",
    rowsPerPage = 5,
}: DataTableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);

    // sellecting row
    const handleRowSelect = (row: T) => {
        const alreadySelected = selectedRows.includes(row);
        const updated = alreadySelected
            ? selectedRows.filter((r) => r !== row)
            : [...selectedRows, row];
        setSelectedRows(updated);
        onRowSelect?.(updated);
    };

    // sorting column
    const handleSort = (col: Column<T>) => {
        if (!col.sortable) return;
        const direction =
            sortColumn === col.dataIndex && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(col.dataIndex);
        setSortDirection(direction);
    };

    // data sorting
    const sortedData = React.useMemo(() => {
        if (!sortColumn) return data;
        return [...data].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Variant styling
    const tableClass = [
        "min-w-full border-collapse",
        variant === "bordered" ? "border border-gray-300 dark:border-gray-600" : "",
    ].join(" ");

    const getRowClass = (idx: number, isSelected: boolean) => {
        let base = `transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700`;
        let bg = "bg-white dark:bg-gray-900";

        if (variant === "striped") {
            bg =
                idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800";
        }

        if (isSelected) {
            bg = "bg-blue-50 dark:bg-blue-900";
        }

        let padding = variant === "compact" ? "p-2" : "p-3";

        return `${base} ${bg} ${padding}`;
    };

    // Loading 
    if (loading)
        return (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                Loading your data… ⏳
            </div>
        );

    if (!loading && data.length === 0)
        return (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No records found. Try adjusting your filters. 😅
            </div>
        );

    return (
        <div className="overflow-x-auto border rounded-lg shadow-sm dark:border-gray-700">
            <table className={tableClass}>
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {selectable && (
                            <th className={variant === "compact" ? "p-2" : "p-3"}></th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`${variant === "compact" ? "p-2" : "p-3"
                                    } text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 cursor-pointer select-none transition-colors duration-200 hover:text-blue-600`}
                                onClick={() => handleSort(col)}
                            >
                                {col.title}{" "}
                                {sortColumn === col.dataIndex
                                    ? sortDirection === "asc"
                                        ? "▲"
                                        : "▼"
                                    : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, idx) => {
                        const isSelected = selectedRows.includes(row);
                        return (
                            <tr key={row.id} className={getRowClass(idx, isSelected)}>

                                {selectable && (
                                    <td className={variant === "compact" ? "p-2" : "p-3"}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleRowSelect(row)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </td>
                                )}
                                {columns.map((col) => {
                                    const cellValue: T[keyof T] = row[col.dataIndex]; // ✅ Type-safe access
                                    return (
                                        <td
                                            key={col.key}
                                            className={`${variant === "compact" ? "p-2" : "p-3"} border-b text-sm text-gray-800 dark:text-gray-200`}
                                        >
                                            {String(cellValue)}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>

            </table>

             {/* Pagination Controls  */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-2 px-3 py-2">
                    <button
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default DataTable;
