import { Outlet } from 'react-router-dom'
import NavbarComps from './components/NavbarComps'
export default function Template(){
    return(
        <>
            <NavbarComps/>
            {/* Menentukan tempat untuk konten dinamis */}
            <Outlet/>
        </>
    )
}