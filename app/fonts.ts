import { Cinzel, Lato, Pinyon_Script, Montserrat, Playfair_Display } from "next/font/google";

export const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-cinzel'
});

export const lato = Lato({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
    variable: '--font-lato'
});

export const pinyon = Pinyon_Script({
    weight: ["400"],
    subsets: ["latin"],
    variable: '--font-pinyon'
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    variable: '--font-montserrat'
});

export const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});
