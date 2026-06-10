import { ImHeadphones } from "react-icons/im"

const Logo = () => {
    return (
        <div className="flex items-center gap-2 select-none">
            <ImHeadphones className="size-8" />
            <div>
                <div className="font-semibold text-[18px]">Stream Beat</div>
                <a href="" target="_blank" className="text-[10px] text-(--alt-text) block -mt-0.5">Powered by Audius</a>
            </div>
        </div>
    )
}

export default Logo