import { Pagination } from "flowbite-react";


export default function PaginationComp({ currentPage, onPageChange, }) {
    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={10}
                onPageChange={onPageChange}
                previousLabel="Halaman Sebelumnya"
                nextLabel="Halaman Selanjutnya"
                showIcons
                theme={{
                    pages: {
                        selector: {
                            active:
                                "bg-green-500/70 text-white hover:bg-green-600/70",
                        },
                    },
                }}
            />
        </div>
    )
}