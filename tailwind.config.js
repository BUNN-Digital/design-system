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

            'brand-primary-dark-2': 'HSLA(215, 85%, 20%, 1.00)',
            'brand-primary-dark-1': 'HSLA(215, 72%, 28%, 1.00)',
            'brand-primary': 'HSLA(215, 60%, 37%, 1)',
            'brand-primary-light-1': 'HSLA(214, 44%, 44%, 1)',
            'brand-primary-light-2': 'HSLA(215, 38%, 56%, 1)',

            'brand-gourmet': 'HSLA(34, 24%, 42%, 1)',
            'brand-gourmet-light-1': 'HSLA(34, 27%, 47%, 1)',

            gray: {
                100: '#f7f7f7',
                200: '#e8e8e8',
                300: '#e0e0e0',
                400: '#cdcdcd',
                500: '#a0a0a0',
                600: '#777777',
                700: '#444444',
                800: '#222222',
                900: '#1a1a1a',
            },

            'declare': 'hsla(36, 90%, 59%, 1)',
            'declare-light': 'hsla(36, 90%, 93%, 1)',
            'avert': 'hsla(358, 66%, 46%, 1)',
            'avert-light': 'hsla(358, 66%, 93%, 1)',
            'affirm': 'hsla(127, 52%, 50%, 1)',
            'affirm-light': 'hsla(127, 52%, 93%, 1)',
            'inform': 'hsla(210, 95%, 43%, 1)',
            'inform-light': 'hsla(210, 95%, 93%, 1)',
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
            }
        }
    },

    variants: {
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColor: ['responsive', 'hover', 'focus'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        borderCollapse: [],
        borderColor: ['responsive', 'hover', 'focus'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidth: ['responsive'],
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
        opacity: ['responsive'],
        outline: ['focus'],
        overflow: ['responsive'],
        padding: ['responsive'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        inset: ['responsive'],
        resize: ['responsive'],
        boxShadow: ['responsive', 'hover', 'focus'],
        fill: [],
        stroke: [],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColor: ['responsive', 'hover', 'focus'],
        fontSize: ['responsive'],
        fontStyle: ['responsive'],
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
