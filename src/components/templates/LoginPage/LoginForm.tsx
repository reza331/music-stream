'use client'
import PasswordInput from '@/components/modules/Inputs/PasswordInputs'
import { BiUser } from 'react-icons/bi'
import { CgKey } from 'react-icons/cg'
import { LoginTitleSection } from './LoginTitleSection'
import TextInput from '@/components/modules/Inputs/TextInputs'
import { useState } from 'react'

const LoginForm = () => {

    const [userValue , setUserValue] = useState('')

    return (
        <form className='w-[350px] neu__norm rounded-3xl p-7 transition-all duration-500 hover:py-9'>
            {/* Title section */}
            <LoginTitleSection />
            {/* Inputs section */}
            <div className="mt-7 flex flex-col gap-5">
                {/* Username input */}
                <TextInput value={userValue} setValue={setUserValue} icon={BiUser} place={`Username ...`} inputID="username" />
                {/* Passowrd input */}
                <PasswordInput icon={CgKey} place={`Password ...`} inputID="password" />
                {/* Submit button  */}
                <button type='submit' className='neu__norm py-3 rounded-full font-semibold hoverEffect'>{`Sign in`}</button>
            </div>
        </form>
    )
}

export default LoginForm