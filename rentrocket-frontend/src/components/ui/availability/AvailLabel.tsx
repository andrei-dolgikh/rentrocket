import { COLORS } from "@/constants/color.constants";

export function AvailLabel({ availability }: { availability : string }) {
    
    let availResult: { indicatorClassName: string; statusDescription: string; } = { indicatorClassName: '', statusDescription: '' };

    switch (availability) {
        case "offline":
            availResult = { indicatorClassName: 'red_circle', statusDescription: 'Не в сети' };
            break;
        case "online":
            availResult = { indicatorClassName: 'green_circle', statusDescription: 'В сети' };
            break;
        default:
            availResult = { indicatorClassName: 'orange_circle', statusDescription: 'Имеются проблемы' };
            break;

    }
    return (
        <div className='flex lg-max:justify-center items-center flex-row  text-[12px] xl:text-[14px] '>
            <div className={`text-[${COLORS.gray_light}]`}>Доступность:</div> 
            <div className='text-white pl-1 '> {availResult.statusDescription} </div> 
            <div className={`circle ${availResult.indicatorClassName}`} ></div> 
        </div>
    )
}