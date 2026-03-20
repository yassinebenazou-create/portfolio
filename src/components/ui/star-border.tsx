import { cn } from "@/lib/utils";
import { ElementType, ComponentPropsWithoutRef } from "react";

interface StarBorderProps<T extends ElementType> {
    as?: T;
    color?: string;
    speed?: string;
    className?: string;
    innerClassName?: string;
    children?: React.ReactNode;
}

export function StarBorder<T extends ElementType = "button">({
    as,
    className,
    innerClassName,
    color = "white",
    speed = "6s",
    children,
    ...props
}: StarBorderProps<T> & ComponentPropsWithoutRef<T>) {
    const Component = as || "button";

    return (
        <Component className={cn("relative inline-block py-[1px] overflow-hidden rounded-[20px]", className)} {...props}>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className={cn("relative z-1 border text-foreground text-center text-[16px] py-[16px] px-[26px] rounded-[20px] bg-background border-border/20 ring-1 ring-border/20 backdrop-blur-md", innerClassName)}>
                {children}
            </div>
        </Component>
    );
}

export default StarBorder;
