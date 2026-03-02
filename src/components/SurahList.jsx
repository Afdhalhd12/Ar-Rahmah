import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SearchComp from "./SearchComp";
import DropdownComp from "./DropdownComp";
import PaginationComp from "./PaginationComp";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SurahList() {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    async function getSurahs() {
        setLoading(true);
        const url = "https://equran.id/api/v2/surat";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setSurahs(result.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }

    }

    const filteredSurahs = surahs.filter((surah) =>
        surah.namaLatin.replace(/-/g, ' ').replace(/'/g, '').toLowerCase().includes(search.toLowerCase())
    );

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentSurahs = filteredSurahs.slice(firstIndex, lastIndex);

    function processSort(type) {
        setSort(true);
        // Copy isi products ke nama baru agar terdeteksi di setProducts untuk memunculkan tampilan produk baru (sesuai hasil sort)
        let surahNew = [...surahs];
        if (type == "alfabet menurun") {
            surahNew.sort(function (a, b) { return a.nomor - b.nomor });
        } else if (type == "alfabet menaik") {
            surahNew.sort(function (a, b) { return b.nomor - a.nomor });
        } else if (type == "ayat terbanyak") {
            surahNew.sort(function (a, b) { return b.jumlahAyat - a.jumlahAyat });
        } else if (type == "ayat terdikit") {
            surahNew.sort(function (a, b) { return a.jumlahAyat - b.jumlahAyat });
        }
        setTimeout(() => {
            setSurahs(surahNew);
            setSort(false);
        }, 300);
    }

    useEffect(() => {
        getSurahs();
        AOS.init({
            duration: 1000,  
        });
}, []);

if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col items-center justify-center">
            <Spinner
                aria-label="Loading surah list"
                size="xl"
                color="success"
                className="mb-4"
            />
            <p className="text-gray-600 text-base font-medium animate-pulse">
                Mengambil data surah...
            </p>
        </div>
    )
}

return (
    <>
        <div className="min-h-screen md:p-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div data-aos="fade-up" className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center mb-4">
                        <div className="h-2 w-20 bg-emerald-200 rounded-full mr-4"></div>
                        <span className="text-emerald-600 text-2xl">✦</span>
                        <div className="h-2 w-20 bg-emerald-200 rounded-full ml-4"></div>
                    </div>

                    <h1 className="md:text-5xl text-xl font-bold text-gray-900 mb-4 leading-tight">
                        Belajar Al-Qur’an dengan  <br />
                        <span className="text-emerald-600">Lebih Terarah</span>
                    </h1>

                    <p className="text-gray-600 md:text-lg text-sm max-w-2xl mx-auto">
                        Jelajahi 114 surah lengkap beserta informasi Makkiyah dan Madaniyah, jumlah ayat, serta susunan yang sistematis.
                    </p>
                    <div className="flex flex-col items-center mt-5">
                        <SearchComp onSearch={setSearch} style={"mx-auto mb-5 md:w-2xl w-[350px]"} />
                        <DropdownComp processorSort={processSort} design={'w-50 mt-2 hover:text-green-400 transform transition hover:scale-2.1'} />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-emerald-100">
                        <div className="text-2xl md:text-3xl font-bold text-emerald-700">{surahs.length}</div>
                        <div className="text-gray-600 text-xs md:text-base">Total Surah</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-emerald-100">
                        <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                            {surahs.filter(s => s.tempatTurun === "Mekah").length}
                        </div>
                        <div className="text-gray-600 text-xs md:text-base">Makkiyah</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-emerald-100">
                        <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                            {surahs.filter(s => s.tempatTurun === "Madinah").length}
                        </div>
                        <div className="text-gray-600 text-xs md:text-base">Madaniyah</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-emerald-100">
                        <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                            6.236
                        </div>
                        <div className="text-gray-600 text-xs md:text-base">Jumlah Ayat</div>
                    </div>
                </div>
                <div className="relative">
                    {sort && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                            <Spinner size="lg" color="success" />
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {currentSurahs.map((surah) => (
                            <Link to={`/surah/${surah.nomor}`}>
                                <div className="bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:shadow-lg shadow-sm p-4 md:p-6 h-full group transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-2 md:space-x-4">
                                            <div className="flex items-center justify-center w-5 h-12 text-black rounded-xl font-bold text-sm md:text-lg group-hover:from-emerald-600 group-hover:to-teal-600 transition-all">
                                                {surah.nomor}
                                            </div>
                                            <div>
                                                <h3 className="text-xs md:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                                    {surah.namaLatin}
                                                </h3>
                                                <p className="text-gray-600 text-xs md:text-sm">{surah.arti}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="md:text-2xl text-sm font-arabic text-gray-800 mb-1 leading-relaxed">
                                                {surah.nama}
                                            </div>
                                            <div className="text-xs md:text-sm text-gray-500">{surah.jumlahAyat} Ayat</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full ${surah.tempatTurun === "Mekah"
                                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                : "bg-blue-50 text-blue-700 border border-blue-200"
                                                }`}>
                                                {surah.tempatTurun == "Mekah" ? "Makkiyah" : "Madaniyah"}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            <span className="text-emerald-600 font-medium">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <PaginationComp currentPage={currentPage}
                        onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    </>
)
}