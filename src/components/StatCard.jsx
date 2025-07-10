import {cn} from "@/lib/util.js";

const StatCard = ({className, title_text, data_text, sub_text, Icon}) => {
    return (
        <div className={cn("card card-border bg-base-100 w-full", className)}>
            <div className={"card-body"}>
                <div className={"flex justify-between items-center gap-10"}>
                    <h1 className={"text-lg font-medium"}>{title_text}</h1>
                    <Icon className={"text-neutral/60"} />
                </div>
                <h2 className={"font-black text-3xl"}>{data_text}</h2>
                <p className={"text-neutral/80"}>{sub_text}</p>
            </div>
        </div>
    )
}

export default StatCard;