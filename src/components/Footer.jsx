import { ScaleIcon } from '@heroicons/react/24/outline'

function Footer() {
    return <footer className = 'text-sm p-4 bg-slate-900 text-slate-100 shadow-lg shadow-slate-300 rounded flex justify-between'>
        <span>&copy; {new Date().getFullYear()} Víctor Gallego</span>
        <span className = 'flex justify-center items-center gap-2'><ScaleIcon className = 'h-4'/>Licensed under <a className = 'text-slate-400' href = 'https://github.com/MorrisGallego/Templater/blob/master/LICENSE'>MIT License</a></span>
        <span>Check-out on <a className = 'text-slate-400' href = 'https://github.com/MorrisGallego/Templater'>GitHub</a></span>
    </footer>
}

export { Footer }