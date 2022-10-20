const colors = require("tailwindcss/colors")

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["Silkscreen", "cursive"],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require("tailwind-heropatterns")({
                patterns: ["random-shapes"],
                colors: { default: colors.slate[900], },
                opacity: { default: "0.1" }
            }
        )
    ]
}