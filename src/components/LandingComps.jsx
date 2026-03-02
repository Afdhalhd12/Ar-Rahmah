import BorderTextComps from "./BorderTextComps";
import CardComps from "./CardComps";
import Mosque from "../assets/Mosque.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function LandingComps() {
    useEffect(() => {
            AOS.init({
                duration: 1000,  
            });
    }, []);
    return (
        <div data-aos="zoom-in"
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${Mosque})` }}
        >
            <div className="p-10 mx-auto">
                <h1 className="text-5xl mt-5 text-emerald-700 font-bold">Menyelami Al-Qur’an, & <br /> Memperdalam Pemahaman Islam</h1>
                <div className="grid grid-cols-12 mt-9 md:gap-0 gap-2">
                    <BorderTextComps text="Jelajahi Al-Qur’an" />
                    <div className="md:col-span-9 col-span-6">
                        <div className="flex items-center md:gap-4 md:py-1 py-2 ">
                            <hr className="flex-1 border-emerald-600" />
                            <span className="text-emerald-700 text-2xl">✦</span>
                            <hr className="flex-1 border-emerald-600" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-3 mt-10">
                    <div className="col-span-4 hidden md:block">
                        <CardComps />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <div className="py-6">
                            <h3 className="text-2xl text-emerald-800 ">Menyelami Al-Qur’an, Memperdalam Pemahaman Islam
                                Ruang untuk belajar, merenung, dan mendekatkan diri melalui ayat-ayat-Nya.</h3>
                        </div>
                        <div className="flex items-center md:gap-4 md:py-1 py-2 ">
                            <hr className="flex-2 border-emerald-600" />
                            <span className="text-emerald-700 text-2xl">✦</span>
                            <hr className="flex-1 border-emerald-600" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <BorderTextComps text="Ruang untuk belajar dan" />
                    <BorderTextComps text="mendekatkan diri melalui ayat-ayat-Nya." />
                </div>
            </div>
        </div>
    )
}