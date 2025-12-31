import { Dispatch, FC, SetStateAction } from "react"

interface TextInputProps {
    value: string
    setValue: Dispatch<SetStateAction<string>>
    inputID: string
    place: string,
    icon: React.ElementType,
    containerClass?: string,
    iconClass?: string,
}

const TextInput: FC<TextInputProps> = ({ value, setValue, place, icon: Icon, inputID, iconClass = 'w-5 h-5', containerClass = 'py-4 w-full gap-3' }) => {
    return (
        <div className={`neu__inner px-5 rounded-full flex ${containerClass} items-center`}>
            <label htmlFor={inputID} className="cursor-pointer">
                <Icon className={`${iconClass}`} />
            </label>
            <input value={value} onChange={(e) => setValue(e.target.value)} id={inputID} type="text" className="block grow" placeholder={place} />
        </div>
    )
}


export default TextInput