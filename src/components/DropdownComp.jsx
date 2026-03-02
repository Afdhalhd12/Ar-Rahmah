import { Dropdown, DropdownItem } from "flowbite-react";

export default function DropdownComp({ processorSort, design }) {
    return (
        <Dropdown color="alternative" className={design} label="Urutkan Data" dismissOnClick={false}>
            <DropdownItem onClick={() => processorSort('alfabet menurun')}>Surah 1-114</DropdownItem>
            <DropdownItem onClick={() => processorSort('alfabet menaik')}>Surah 114-1</DropdownItem>
            <DropdownItem onClick={() => processorSort('ayat terbanyak')}>Ayat terbanyak</DropdownItem>
            <DropdownItem onClick={() => processorSort('ayat terdikit')}>Ayat terdikit</DropdownItem>
        </Dropdown>
    )
}