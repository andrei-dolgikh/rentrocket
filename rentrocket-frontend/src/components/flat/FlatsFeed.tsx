import { FlatsFeedElement } from './FlatsFeedElement'
import { IFlatResponse } from '../../types/flat.types';
import { Card } from "@heroui/react";


enum CardType {
    Admin = 'admin',
    Client = 'client',
}

export function FlatsFeed(
    {
        flats,
        showCheckbox,
        onCheckboxChange
    }:
        {
            flats?: IFlatResponse[],
            showCheckbox?: boolean,
            onCheckboxChange?: (id: string, checked: boolean) => void
        }) {

    const isNoFlats = flats && flats?.length == 0;


    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
            {
                flats?.map((flat) =>
                    <FlatsFeedElement
                        key={flat.id}
                        flat={flat}
                        showCheckbox={showCheckbox}
                        onCheckboxChange={onCheckboxChange}
                    />
                )
            }
            </div>
            {isNoFlats &&
                <Card className="p-5 mt-5">
                    <h1>Здесь ничего нет.</h1>
                </Card>}
        </div>
    )
}