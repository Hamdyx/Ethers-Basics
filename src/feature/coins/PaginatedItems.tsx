import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";
import TableRow from "components/TableRow";

const PaginatedItems: React.FC<{ itemsPerPage: number; itemsIds: any[] }> = ({
    itemsPerPage,
    itemsIds
}) => {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState<number>(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(itemsIds.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(itemsIds.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, itemsIds]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % itemsIds.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} indexOffset={itemOffset} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={undefined}
                className="flex gap-6 py-4 px-2 w-full items-center justify-center"
            />
        </>
    );
};

const Items: React.FC<{ currentItems: any[]; indexOffset: any }> = ({
    currentItems,
    indexOffset
}) => {
    return (
        <>
            {currentItems &&
                currentItems.map((item: EntityId, i: number) => (
                    <TableRow
                        key={item}
                        coinId={item}
                        index={i + indexOffset}
                    />
                ))}
        </>
    );
};

export default PaginatedItems;
