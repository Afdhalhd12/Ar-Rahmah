"use client";

import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";

export default function SearchComp({onSearch, style}) {
    return (
        <TextInput color="success" className={style} id="text" type="text" icon={CiSearch} onChange={(e) => onSearch(e.target.value)} placeholder="Cari Nama Surah" required />
    )
}