
type BadgeProps = {
    imageSrc?: string
}

const Badge = ({ imageSrc }: BadgeProps) => {
    return (
        <div className="w-12 aspect-square rounded-full bg-slate-200 overflow-hidden">
            {imageSrc && <img src={imageSrc} className="w-full h-full object-cover"/>}
        </div>
    )
}

export default Badge