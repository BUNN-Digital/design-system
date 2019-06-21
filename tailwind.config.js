/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.
*/

module.exports = {

    theme: {

        colors: {
            'transparent': 'transparent',
            'black': '#0b0b0b',
            'white': '#ffffff',

            'brand-primary-RGB': 'var(--color-brand-primary-RGB)',
            'brand-primary': 'var(--color-brand-primary)',
            'brand-primary-light-1': 'var(--color-brand-primary-light-1)',
            'brand-primary-light-2': 'var(--color-brand-primary-light-2)',
            'brand-primary-dark-1': 'var(--color-brand-primary-dark-1)',
            'brand-primary-dark-2': 'var(--color-brand-primary-dark-2)',

            gray: {
                100: 'var(--color-gray-100)',
                200: 'var(--color-gray-200)',
                300: 'var(--color-gray-300)',
                400: 'var(--color-gray-400)',
                500: 'var(--color-gray-500)',
                600: 'var(--color-gray-600)',
                700: 'var(--color-gray-700)',
                800: 'var(--color-gray-800)',
                900: 'var(--color-gray-900)',
            },

            'declare': 'var(--color-declare)',
            'declare-light': 'var(--color-declare-light)',
            'avert': 'var(--color-avert)',
            'avert-light': 'var(--color-avert-light)',
            'affirm': 'var(--color-affirm)',
            'affirm-light': 'var(--color-affirm-light)',
            'inform': 'var(--color-inform)',
            'inform-light': 'var(--color-inform-light)',

            // black alphas
            'black-rgba-0': 'rgba(0,0,0,0)',
            'black-rgba-10': 'rgba(0,0,0,0.1)',
            'black-rgba-20': 'rgba(0,0,0,0.2)',
            'black-rgba-30': 'rgba(0,0,0,0.3)',
            'black-rgba-40': 'rgba(0,0,0,0.4)',
            'black-rgba-50': 'rgba(0,0,0,0.5)',
            'black-rgba-60': 'rgba(0,0,0,0.6)',
            'black-rgba-70': 'rgba(0,0,0,0.7)',
            'black-rgba-80': 'rgba(0,0,0,0.8)',
            'black-rgba-90': 'rgba(0,0,0,0.9)',
            'black-rgba-100': 'rgba(0,0,0,1)',

            // white alphas
            'white-rgba-0': 'rgba(255,255,255,0)',
            'white-rgba-10': 'rgba(255,255,255,.1)',
            'white-rgba-20': 'rgba(255,255,255,0.2)',
            'white-rgba-30': 'rgba(255,255,255,0.3)',
            'white-rgba-40': 'rgba(255,255,255,0.4)',
            'white-rgba-50': 'rgba(255,255,255,0.5)',
            'white-rgba-60': 'rgba(255,255,255,0.6)',
            'white-rgba-70': 'rgba(255,255,255,0.7)',
            'white-rgba-80': 'rgba(255,255,255,0.8)',
            'white-rgba-90': 'rgba(255,255,255,0.9)',
            'white-rgba-100': 'rgba(255,255,255,1)',

            // brand alphas
            'brand-primary-rgba-0': 'rgba(var(--color-brand-primary-RGB),0)',
            'brand-primary-rgba-10': 'rgba(var(--color-brand-primary-RGB),0.1)',
            'brand-primary-rgba-20': 'rgba(var(--color-brand-primary-RGB),0.2)',
            'brand-primary-rgba-30': 'rgba(var(--color-brand-primary-RGB),0.3)',
            'brand-primary-rgba-40': 'rgba(var(--color-brand-primary-RGB),0.4)',
            'brand-primary-rgba-50': 'rgba(var(--color-brand-primary-RGB),0.5)',
            'brand-primary-rgba-60': 'rgba(var(--color-brand-primary-RGB),0.6)',
            'brand-primary-rgba-70': 'rgba(var(--color-brand-primary-RGB),0.7)',
            'brand-primary-rgba-80': 'rgba(var(--color-brand-primary-RGB),0.8)',
            'brand-primary-rgba-90': 'rgba(var(--color-brand-primary-RGB),0.9)',
            'brand-primary-rgba-100': 'rgba(var(--color-brand-primary-RGB),1)',
        },

        opacity: {
            '0': '0',
            '10': '0.1',
            '20': '0.2',
            '30': '0.3',
            '40': '0.4',
            '50': '0.5',
            '60': '0.6',
            '70': '0.7',
            '80': '0.8',
            '90': '0.9',
            '100': '1',
        },

        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1200px',
            'xl': '1920px',
        },

        fontFamily: {
            'sans-regular': [
                '"AvenirNextLTW01-Regular"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-regular-ital': [
                '"AvenirNextLTW01-Italic"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-demi': [
                '"Avenir Next LT W01 Demi"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-demi-ital': [
                '"AvenirNextLTW01-DemiIta"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-medium': [
                '"AvenirNextLTW01-Medium"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-medium-ital': [
                '"AvenirNextLTW01-MediumI_721278"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-light': [
                '"Avenir Next W01 Light"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'sans-light-ital': [
                '"AvenirNextW01-LightItal"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
            ],
            'mono': [
                '"Menlo"',
                '"Monaco"',
                '"Consolas"',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ]
        },

        fontSize: {
            'sm-3': '0.625rem',     // 10px       milli
            'sm-2': '0.75rem',      // 12px       tiny
            'sm-1': '0.875rem',     // 14px       small
            'base': '1rem',         // 16px

            // Body and Headings - Ratio: 1.25 @ 16
            // https://www.modularscale.com/?18&px&1.25
            'body': '1.125rem',     // 18px       body, .heading-epsilon
            'lg-1': '1.25rem',      // 20px
            'lg-2': '1.75rem',      // 28px       .heading-delta
            'lg-3': '2rem',         // 36px       .heading-gamma
            'lg-4': '2.75rem',      // 44px       .heading-beta
            'lg-5': '3.4375rem',    // 55px       .heading-alpha
            'display': '4.25rem',   // 68px       display
            'jumbo': '5.375rem',    // 86px       jumbo
        },

        fontWeight: {
            'hairline': 100,
            'thin': 200,
            'light': 300,
            'normal': 400,
            'medium': 500,
            'semibold': 600,
            'bold': 700,
            'extrabold': 800,
            'black': 900,
        },

        borderColor: theme => {
            return global.Object.assign({default: theme('colors.gray.300', 'currentColor')}, theme('colors'))
        },

        zIndex: {
            'negative': -1,
            'auto': 'auto',
            'page': 0,
            'shell': 100,
            'menu': 200,
            'floating': 300,
            'overlay': 400,
            'modal': 500,
        },

        extend: {
            maxWidth: {
                '7xl': '80rem',
                '8xl': '90rem',
                '9xl': '120rem',
            },
            
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
                '108': '27rem',
                '120': '30rem',
                '132': '33rem',
            }
        }
    },

    variants: {
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive', 'group-hover'],
        borderCollapse: [],
        borderColor: ['responsive', 'hover', 'focus', 'group-hover'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidth: ['responsive', 'group-hover'],
        cursor: ['responsive'],
        display: ['responsive'],
        flexDirection: ['responsive'],
        flexWrap: ['responsive'],
        alignItems: ['responsive'],
        alignSelf: ['responsive'],
        justifyContent: ['responsive'],
        alignContent: ['responsive'],
        flex: ['responsive'],
        flexGrow: ['responsive'],
        flexShrink: ['responsive'],
        float: ['responsive'],
        fontFamily: ['responsive'],
        fontWeight: ['responsive', 'hover', 'focus'],
        height: ['responsive'],
        lineHeight: ['responsive'],
        listStylePosition: ['responsive'],
        listStyleType: ['responsive'],
        margin: ['responsive'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        negativeMargin: ['responsive'],
        objectFit: ['responsive'],
        objectPosition: ['responsive'],
        opacity: ['responsive', 'group-hover'],
        outline: ['focus'],
        overflow: ['responsive'],
        padding: ['responsive'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        inset: ['responsive'],
        resize: ['responsive'],
        boxShadow: ['responsive', 'hover', 'focus', 'group-hover'],
        fill: [],
        stroke: [],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        fontSize: ['responsive'],
        fontStyle: ['responsive', 'group-hover'],
        textTransform: ['responsive'],
        textDecoration: ['responsive', 'hover', 'focus'],
        fontSmoothing: ['responsive'],
        letterSpacing: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        wordBreak: ['responsive'],
        width: ['responsive'],

    },

    corePlugins: {
        container: false
    },


    /*
	|-----------------------------------------------------------------------------
	| Plugins                                https://tailwindcss.com/docs/plugins
	|-----------------------------------------------------------------------------
	|
	| Here is where you can register any plugins you'd like to use in your
	| project. Tailwind's built-in `container` plugin is enabled by default to
	| give you a Bootstrap-style responsive container component out of the box.
	|
	| Be sure to view the complete plugin documentation to learn more about how
	| the plugin system works.
	|
	*/

    plugins: []
};
