import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Loader2 } from "lucide-react"


type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

interface SpinnerButtonProps extends TypeButton {
	state?: boolean
}

export function Button({
	children,
	className,
	state,
	disabled,
	...rest
}: PropsWithChildren<SpinnerButtonProps>) {


	return (


		<button
			className={cn(
				className,
				`linear rounded-xl py-2 xl:py-2 px-2 xl:px-5 text-white transition bg-brandBlue ${disabled ? 'opacity-50' : ''}`
			)}
			{...rest}
			disabled={disabled}
		>
			{state ? <Loader2 className="animate-spin m-auto w-5 h-5" /> : <div>{children}</div>}
		
		</button>
	)
}
