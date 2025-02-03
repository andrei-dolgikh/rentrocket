import Image from 'next/image'
import { Menu } from '../menu/Menu'

export function Footer() {
    return (
        <div style={{ backgroundColor: '#202020' }} className='' >
            <div className='mx-[30px] max-w-[1200px] lg:mx-auto' >
                <div
                    className='flex  py-[37px] line-height-[100px] height-[100px] justify-center lg:justify-between' >

                    <hr style={{ color: '#979797' }} className='pb-[30px]' />
                    <div className=' max-w-[60%] text-center'>
                        <Image
                            src='/header_logo.png'
                            alt='logo'
                            width={200}
                            height={28}
                            className='md-max:m-auto'
                            priority
                        />
                        <div
                            style={{ color: '#999999' }}
                            className='py-2 text-[8px] lg:text-[14px] text-center lg:text-left md-max:m-auto'>
                            Крупнейший маркетплейс после HYDRA. Основан в 2018 году как альтернатива монополисту. Более 10 000 товаров разной направленности и 1 000 магазинов внутри площадки Крупнейший маркетплейс после HYDRA. Основан в 2018 году как
                        </div>
                        <div className='text-[12px] lg:hidden text-center text-white'>
                            @onionwiki_project
                        </div>
                    </div>
                    <section className='hidden lg:block'>
                        <Menu />
                    </section>

                </div>
            </div>
        </div>
    )
}
