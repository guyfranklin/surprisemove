export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'gnar-black': '#0a0a0a',
                'acid-green': '#ccff00',
                'shock-pink': '#ff00cc',
                'electric-blue': '#00ffff',
                'tape-gray': '#d1d5db',
            },
            fontFamily: {
                sans: ['Anton', 'sans-serif'],
                mono: ['Courier Prime', 'monospace'],
                marker: ['Permanent Marker', 'cursive'],
            },
            backgroundImage: {
                'noise': "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
            },
            boxShadow: {
                'hard': '4px 4px 0px 0px #000',
                'hard-white': '4px 4px 0px 0px #fff',
                'hard-pink': '6px 6px 0px 0px #ff00cc',
                'hard-green': '6px 6px 0px 0px #ccff00',
                'hard-black': '6px 6px 0px 0px #000',
            }
        },
    },
    plugins: [],
}
