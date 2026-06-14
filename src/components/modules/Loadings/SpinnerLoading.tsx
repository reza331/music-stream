import { FC } from "react"

interface SpinnerLoadingProps {
    className?: string
    withText?: boolean
    text?: string
    size?: string | number
    borderWidth?: string | number
    textSize?: string | number
}

const SpinnerLoading: FC<SpinnerLoadingProps> = ({ withText, text, size, borderWidth, textSize, className }) => {
    return (
        <div className="flex items-center gap-2">
            <div style={{ width: size, borderWidth }} className={`${className} spinnerLoader`} />
            {withText && <div style={{ fontSize: textSize }} className="font-semibold">{text}</div>}
        </div>
    )
}

export default SpinnerLoading