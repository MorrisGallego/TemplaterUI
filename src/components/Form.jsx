import { useContext, useState } from 'react'

import { Mode, ModeSelector } from './ModeSelector.jsx'
import { TemplatesContext } from '../context/TemplatesContext.jsx'

import * as Papa from 'papaparse'
import {ArrowUpTrayIcon, RocketLaunchIcon, SparklesIcon} from '@heroicons/react/24/outline'

function SingleForm({variables, onSubmit}){
    const generate = event => {
        event.preventDefault()
        const values = Object.fromEntries([...new FormData(event.target).entries()])
        const fileNamePattern = values.fileNamePattern
        delete values.fileNamePattern
        onSubmit([values], fileNamePattern)
    }

    return <form className='flex flex-1 flex-col gap-4' onSubmit = { generate }>
        <fieldset className = 'border border-slate-900 border-opacity-25 rounded p-4 flex flex-col gap-4'>
            <legend className = 'ml-2 px-2 font-bold uppercase text-sm'>Variables</legend>
            {
                variables?.map(variable =>
                    <fieldset className = 'grid grid-cols-3 gap-4 items-center' key = {variable}>
                        <label title = {variable} htmlFor = {variable} className = 'col-span-1 overflow-hidden overflow-ellipsis w-full'>{variable}</label>
                        <input className = 'col-span-2 px-4 py-1 border border-slate-900 border-opacity-25 rounded-full focus:ring focus:ring-slate-600 focus:ring-opacity-50 focus:border-transparent' type = 'text' id = {variable} name = {variable}/>
                    </fieldset>
                )
            }
        </fieldset>

        <fieldset className = 'flex'>
            <input className = 'h-14 w-1/2 px-4 border border-slate-300 rounded-l focus:ring focus:ring-slate-600 focus:ring-opacity-50 focus:border-transparent' type = 'text' placeholder = 'Filename expression (optional)' id = 'fileNamePattern' name = 'fileNamePattern' />
            <button type = 'submit' className = 'h-14 w-1/2 overflow-hidden flex-1 text-slate-100 group rounded-r'>
                <span className = 'block w-full p-4 h-14 text-center flex justify-center items-center bg-green-600 -translate-y-full transition-transform group-hover:translate-y-0'>
                    <RocketLaunchIcon className = 'h-5' />
                </span>
                <span className = 'block p-4 w-full h-14 bg-slate-900 text-center -translate-y-full transition-transform group-hover:translate-y-0'>Generate</span>
            </button>
        </fieldset>
    </form>
}

function BatchForm({variables, onSubmit}) {
    const [text, setText] = useState('')
    const [data, setData] = useState([])
    const [fileNamePattern, setFileNamePattern] = useState('')

    const parseText = () => {
        let parsed = Papa.parse(text, { header: true, skipEmptyLines: 'greedy', transform: value => value.trim(), transformHeader: value => value.trim()})
        setData(parsed.data)
    }
    const parseFile = async event => {
        const file = event.target.files[0]
        const text = await file.text();

        let parsed = Papa.parse(text, { header: true, skipEmptyLines: 'greedy', transform: value => value.trim(), transformHeader: value => value.trim()})
        setText(text)
        setData(parsed.data)
    }

    const generate = () => {
        onSubmit(data, fileNamePattern)
    }

    return <div>
        {
            data.length !== 0 &&
            <table className='w-full text-center border border-slate-300 mb-4'>
                <thead className='border border-slate-300 text-sm'>
                <tr>
                    {
                        variables?.map(variable => <th key={variable}>{variable}</th>)
                    }
                </tr>
                </thead>
                <tbody className='font-mono text-sm'>
                {
                    data.map((row, idx) => <tr key={idx}>
                        {variables?.map(variable =>
                            <td key={`${idx}-${variable}`}>{row[variable]}</td>
                        )}
                    </tr>)
                }
                </tbody>
            </table>
        }

        <textarea className = 'w-full h-72 overflow-y-scroll text-sm font-mono resize-none border border-slate-300 rounded focus:ring focus:ring-slate-600 focus:ring-opacity-50 focus:border-transparent mb-4'
                  onChange = { event => setText(event.target.value) }
                  value = { text }
                  placeholder = 'Paste here your CSV or upload a file'
        />

        <nav className = 'w-full text-slate-900 rounded h-14 border border-slate-500 overflow-hidden'>
            <button className = 'group disabled:text-slate-300 w-1/2 border-r border-slate-500' onClick = { parseText } disabled = { !text }>
                <span className = {`block p-4 w-full h-14 text-center text-white flex justify-center items-center bg-sky-500 -translate-y-full transition-transform ${!!text ? 'group-hover:translate-y-0' : ''}`} >
                    <SparklesIcon className = 'h-5' />
                </span>
                <span className = {`block p-4 w-full h-14 text-center -translate-y-full transition-transform ${!!text ? 'group-hover:translate-y-0' : ''}`}>Parse</span>
            </button>

            <button className = 'group w-1/2'>
                <label className = 'cursor-pointer block p-4 w-full h-14 text-center text-white flex justify-center items-center bg-teal-500 -translate-y-full transition-transform group-hover:translate-y-0'>
                    <input type = 'file' accept = 'text/csv' onChange = { parseFile } className = 'hidden'/>
                    <ArrowUpTrayIcon className = 'h-5' />
                </label>

                <span className = 'block p-4 w-full h-14 text-center -translate-y-full transition-transform group-hover:translate-y-0'>Upload CSV</span>
            </button>
        </nav>

        <span className = 'flex mt-4'>
            <input className = 'h-14 w-1/2 px-4 border border-slate-300 rounded-l focus:ring focus:ring-slate-600 focus:ring-opacity-50 focus:border-transparent'
                   type = 'text'
                   placeholder = 'Filename expression (optional)'
                   id = 'fileNamePattern'
                   name = 'fileNamePattern'
                   value = { fileNamePattern }
                   onChange = { evt => setFileNamePattern(evt.target.value) }
            />
            <button type = 'submit' className = 'h-14 w-1/2 overflow-hidden flex-1 text-slate-100 group rounded-r' onClick = { generate }>
                <span className = 'block w-full p-4 h-14 text-center flex justify-center items-center bg-green-600 -translate-y-full transition-transform group-hover:translate-y-0'>
                    <RocketLaunchIcon className = 'h-5' />
                </span>
                <span className = 'block p-4 w-full h-14 bg-slate-900 text-center -translate-y-full transition-transform group-hover:translate-y-0'>Generate</span>
            </button>
        </span>
    </div>
}

function Form() {
    const {template: {variables, name}, generate} = useContext(TemplatesContext)
    let [mode, setMode] = useState(Mode.SINGLE)

    return <div className='p-4 flex flex-1 flex-col gap-4'>
        <div className = 'flex justify-between'>
            <h2 className = 'text-xl'><span className = 'font-bold uppercase mx-2'>Template:</span><span className = 'italic'>{ name }</span></h2>
            <ModeSelector mode = { mode } onChange = { setMode } />
        </div>

        { mode === Mode.SINGLE  && <SingleForm variables = { variables } onSubmit = { generate } /> }
        { mode === Mode.MULTI && <BatchForm variables = { variables } onSubmit = { generate } /> }
    </div>
}

export { Form }