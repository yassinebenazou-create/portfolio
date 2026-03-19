import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import FOG from "vanta/dist/vanta.fog.min";
import { useTheme } from "next-themes";
import { useThemeColor } from "@/hooks/use-theme-color";

const VantaBackground = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const { theme, systemTheme } = useTheme();
    const { themeColor } = useThemeColor();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!vantaRef.current || !mounted) return;

        const effect = FOG({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            blurFactor: 0.85,
            speed: 1.40,
            zoom: 0.60
        });

        setVantaEffect(effect);

        return () => {
            if (effect) effect.destroy();
        };
    }, [mounted]);

    useEffect(() => {
        if (!vantaEffect) return;

        const currentTheme = theme === "system" ? systemTheme : theme;
        const isDark = currentTheme === "dark";

        // Color mapping for Vanta (HEX values)
        const colorMap = {
            green: {
                light: { highlight: 0x2bbe2b, midtone: 0x90ee90, lowlight: 0x228b22 },
                dark: { highlight: 0x2bbe2b, midtone: 0x1a4d1a, lowlight: 0x0d260d }
            },
            blue: {
                light: { highlight: 0x0099ff, midtone: 0x87cefa, lowlight: 0x1e90ff },
                dark: { highlight: 0x007acc, midtone: 0x003366, lowlight: 0x001a33 }
            },
            purple: {
                light: { highlight: 0x9933ff, midtone: 0xe6e6fa, lowlight: 0x8a2be2 },
                dark: { highlight: 0x800080, midtone: 0x4b0082, lowlight: 0x2e004f }
            },
            orange: {
                light: { highlight: 0xffa500, midtone: 0xffd700, lowlight: 0xff8c00 },
                dark: { highlight: 0xff8c00, midtone: 0x8b4500, lowlight: 0x5e2f00 }
            },
            pink: {
                light: { highlight: 0xff69b4, midtone: 0xffb6c1, lowlight: 0xff1493 },
                dark: { highlight: 0xff1493, midtone: 0x8b008b, lowlight: 0x5c005c }
            },
            red: {
                light: { highlight: 0xff0000, midtone: 0xff6b6b, lowlight: 0xdc143c },
                dark: { highlight: 0xdc143c, midtone: 0x8b0000, lowlight: 0x5c0000 }
            }
        };

        const selectedColors = colorMap[themeColor] || colorMap.green;
        const colors = isDark ? selectedColors.dark : selectedColors.light;
        const baseColor = isDark ? 0x000000 : 0xffffff;

        vantaEffect.setOptions({
            highlightColor: colors.highlight,
            midtoneColor: colors.midtone,
            lowlightColor: colors.lowlight,
            baseColor: baseColor
        });
    }, [vantaEffect, theme, systemTheme, themeColor]);

    return (
        <div
            ref={vantaRef}
            className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
        />
    );
};

export default VantaBackground;
