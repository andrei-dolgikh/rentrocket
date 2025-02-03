
import type { CSSProperties, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'
import { COLORS } from '@/constants/color.constants'

interface IBadge {
	className?: string
    variant?: 'blue' | 'green' | 'gray' | 'indigo' | 'yellow' | 'brown' 
	style?: CSSProperties
}

const badge = tv({
	base: 'rounded-xl h-fit py-[4px] px-[14px] text-[14px] lg:text-[18px] text-white transition line-height-[20px]',
	variants: {
		backgroundColor: {
			blue: `bg-brandBlue`,
			green: `bg-brandGreen`,
			gray: `bg-brandGray`,
			indigo: `bg-brandIndigo`,
			yellow: `bg-brandYellow`,
			brown: `bg-brandBrown`,
		}
	},
	defaultVariants: {
		backgroundColor: 'blue'
	}
})

export function Badge({
	children,
	className,
	variant,
	style
}: PropsWithChildren<IBadge>) {
	return (
		<div
			className={badge({
				backgroundColor: variant,
				className
			})}
			style={style}
		>
			{children}
		</div>
	)
}
