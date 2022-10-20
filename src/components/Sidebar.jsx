import {useContext} from 'react'

import {TemplatesContext} from '../context/TemplatesContext.jsx'

import { ArchiveBoxXMarkIcon, ArrowUpOnSquareStackIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

function Sidebar() {
    const { templates, template, selectTemplate, deleteTemplate, uploadTemplate } = useContext(TemplatesContext)

    return <aside className = 'col-span-2 bg-slate-900 text-slate-100 flex flex-col justify-between shadow shadow-slate-600'>
        <ul className = 'flex flex-col'>
            {
                templates?.map(currentTemplate =>
                    <li className = {`${template.name === currentTemplate ? 'bg-slate-800' : ''} flex items-center overflow-hidden h-12 group hover:bg-slate-700`} key = {currentTemplate}>
                        <button className = 'text-left flex-1 px-4 h-full flex items-center' onClick = { () => selectTemplate(currentTemplate) }>
                            <DocumentTextIcon className = 'h-5 mr-2'/>
                            {currentTemplate}
                        </button>
                        <button className = 'transition-transform translate-x-full bg-red-600 px-4 shadow-inner shadow-red-900 h-full group-hover:translate-x-0 hover:bg-red-700'
                                onClick = { () => deleteTemplate(currentTemplate) }
                        >
                            <ArchiveBoxXMarkIcon className = 'h-5' />
                        </button>
                    </li>
                )
            }
        </ul>
        <button className = 'bg-slate-800 relative h-14 overflow-hidden group'>
            <span className = 'block p-4 w-full h-full'>Upload template</span>
            <label className = 'cursor-pointer w-full h-full flex justify-center items-center shadow-inner shadow-amber-700 transition-transform -translate-y-full translate-x-full bg-amber-600 group-hover:translate-x-0'>
                <input type = 'file' accept = 'application/zip' className = 'hidden' onChange = { evt => uploadTemplate(evt.target.files[0]) } />
                <ArrowUpOnSquareStackIcon className = 'h-5' />
            </label>
        </button>
    </aside>
}

export { Sidebar }