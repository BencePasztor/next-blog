'use client'

import Input from "@/components/admin/ui/Input"
import Button from "@/components/common/ui/Button"
import { signIn } from "next-auth/react"
import { useRef, SyntheticEvent } from "react"

const LoginForm = () => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = emailRef.current!.value
        const password = passwordRef.current!.value
        signIn("credentials", { email, password, callbackUrl: "/admin/articles" })
    }

    return (
        <form onSubmit={submitHandler}>
            <Input ref={emailRef} name="email" id="email" label="Email" type="email" />
            <Input ref={passwordRef} name="password" id="password" label="Password" type="password" />
            <Button className="w-full text-base" type="submit">Login</Button>
        </form>
    )
}

export default LoginForm