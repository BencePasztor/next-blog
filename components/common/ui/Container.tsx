import { ComponentPropsWithoutRef, ElementType } from "react"
import { twMerge } from "tailwind-merge"

type ContainerOwnProps<E extends ElementType> = {
    as?: E
}

type ContainerProps<E extends ElementType> = ContainerOwnProps<E> & Omit<ComponentPropsWithoutRef<E>, "as">

const Container = <E extends ElementType = "div">({ as, className, children, ...restProps }: ContainerProps<E>) => {
    const Element = as ?? "div"

    return (
        <Element className={twMerge("container mx-auto p-4 rounded-lg", className)} {...restProps}>{children}</Element>
    )
}

export default Container