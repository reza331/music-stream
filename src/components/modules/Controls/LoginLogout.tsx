'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md"

const LoginLogoutArea = () => {

    const { status } = useSession()

    if (status === 'loading') return null

    return (
        <>
            <div className="transition-[scale,color] duration-500 hover:text-(--hover-color) cursor-pointer hover:scale-[1.2]">
                {status === 'authenticated' && <MdOutlineLogout onClick={() => signOut()} className="size-4" />}
                {status === 'unauthenticated' && <MdOutlineLogin onClick={() => signIn('google', { prompt: "select_account" })} className="size-4" />}
            </div>
        </>
    )
}

export default LoginLogoutArea