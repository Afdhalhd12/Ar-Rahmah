import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import SearchComp from "./SearchComp";
import DropdownComp from "./DropdownComp";


export default function SurahComp({ surah }) {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showList, setShowList] = useState(false);
    const [sort, setSort] = useState(false);

    async function getSurahs() {
        const url = "https://equran.id/api/v2/surat";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setSurahs(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    const filteredSurahs = surahs.filter((surah) =>
        surah.namaLatin.replace(/-/g, ' ').replace(/'/g, '').toLowerCase().includes(search.toLowerCase())
    );

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
    }, []);

    

    return (
        <>
            <div className="bg-[#e9f5f1] p-3 md:p-5 mx-auto">

                {/* buat hp tak kasih ini aja */}
                <div className="md:hidden mb-3">
                    <button
                        onClick={() => setShowList(!showList)}
                        className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-emerald-200 text-sm font-semibold text-emerald-700"
                    >
                        <span>Daftar Surah</span>
                        <span>{showList ? "▲ Tutup" : "▼ Buka"}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2 md:mt-5">

                    <div className={`lg:col-span-1 ${showList ? "block" : "hidden"} md:block`}>
                        <div className="mb-3">
                            <SearchComp style={"w-full"} onSearch={setSearch} />
                            <div className="flex justify-center">
                                <DropdownComp processorSort={processSort} design={'w-50 mt-2 hover:text-green-400 transform transition hover:scale-2.1'} />
                            </div>  
                        </div>

                        <div className="relative">
                            {sort && (
                                <div className="absolute inset-0 bg-[#e9f5f1]/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                                    <Spinner size="lg" color="success" />
                                </div>
                            )}
                            <div className="space-y-1 max-h-[400px] md:max-h-[500px] overflow-y-auto overflow-x-hidden px-2 py-2">
                                {filteredSurahs.map((surah) => (
                                    <Link to={`/surah/${surah.nomor}`} key={surah.nomor} onClick={() => setShowList(false)}>
                                        <div className="flex items-center justify-between border-b border-gray-200 hover:bg-white hover:rounded-xl px-3 py-3 transition-all">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-semibold text-gray-500 w-5 shrink-0">{surah.nomor}</span>
                                                <div>
                                                    <h3 className="text-sm font-semibold leading-tight">{surah.namaLatin}</h3>
                                                    <p className="text-xs text-gray-500">{surah.arti}</p>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0 ml-2">
                                                <p className="text-base font-arabic">{surah.nama}</p>
                                                <p className="text-xs text-gray-500">{surah.jumlahAyat} Ayat</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-2">
                        <div className="max-h-[75vh] md:max-h-[500px] overflow-y-auto overflow-x-hidden px-2 md:px-4 py-3">

                            <div className="border-b border-gray-300 mb-4">
                                <h3 className="text-sm md:text-base font-semibold">Surah: {surah.namaLatin}</h3>
                                <p className="text-xs md:text-sm text-gray-600 mb-3">Arti: {surah.arti}</p>
                                <div dangerouslySetInnerHTML={{__html: surah.deskripsi}} className="text-xs md:text-sm text-gray-600 mb-3"></div>
                                
                            </div>

                            {surah.ayat.map((chapter) => (
                                <div key={chapter.nomorAyat} className="mt-4 border-b border-gray-200 pb-4">
                                    <div className="flex justify-end items-start gap-2 mb-3">
                                        <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-gray-300 text-xs shrink-0 mt-1">
                                            {chapter.nomorAyat.toLocaleString('ar-SA')}
                                        </span>
                                        <p dir="rtl" className="text-xl md:text-2xl font-arabic leading-loose">
                                            {chapter.teksArab}
                                        </p>
                                    </div>
                                    <p className="text-sm md:text-base mb-2 text-gray-500 italic">{chapter.teksLatin}</p>
                                    <p className="text-sm md:text-base text-gray-800">{chapter.teksIndonesia}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}