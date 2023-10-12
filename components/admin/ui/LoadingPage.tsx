import Spinner from "@/components/common/ui/Spinner"

const LoadingPage = () => {
    return (
        <div className="w-full h-full bg-white relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spinner className="w-16 border-4" />
            </div>
        </div>
    )
}

export default LoadingPage

