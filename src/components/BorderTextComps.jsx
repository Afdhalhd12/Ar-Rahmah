export default function BorderTextComps({text}) {
    return (
        <div className="md:col-span-3 col-span-6">
            <div className="inline-block rounded-full border border-emerald-600 text-emerald-800 md:px-6 md:py-2 md:text-sm text-xs md:p-0 p-2">
                {text}
            </div>
        </div>
    )
}