import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import SurahComp from "../components/SurahComp";
export default function Surah() {
    const { surahId } = useParams();
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);


    async function getSurahs() {
        const url = "https://equran.id/api/v2/surat/" + surahId;
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

    useEffect(() => {
        getSurahs();
    }, [surahId]);

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
            <SurahComp surah={surahs} />
        </>
    )
}