'use client'
import { MainBanner } from "./MainBanner"
// import { FlatsFeed } from "../flat/FlatsFeed"
import { useFlats } from '../../../app/[lang]/admin/flats/hooks/useFlats'

enum CardType {
    Admin = 'admin',
    Client = 'client',
}

export function MainLayout( ) {
    const { flats } = useFlats() 
    
	return (
		<>
            <MainBanner />
             {/* <FlatsFeed flats={flats}  /> */}
             
        </>
    )
}
