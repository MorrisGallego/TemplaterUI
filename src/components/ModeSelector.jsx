import { Switch } from '@headlessui/react'
import { DocumentIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'

const Mode = Object.freeze({
    SINGLE: 'single',
    MULTI: 'multi'
})

function ModeSelector({mode = Mode.SINGLE, onChange = () => {}}) {
    return <span className = 'flex items-center gap-4 text-sm'>
        <Switch.Group>
            <Switch.Label className = 'font-bold'>
                { mode === Mode.MULTI
                    ? <span className = 'flex'><DocumentDuplicateIcon className = 'h-5 mx-2'/>Batch generation</span>
                    : <span className = 'flex'><DocumentIcon className = 'h-5 mx-2'/>Single generation</span>
                }
            </Switch.Label>
            <Switch
                checked = { mode === Mode.MULTI }
                onChange = { value => onChange( value ? Mode.MULTI : Mode.SINGLE) }
                className={`${mode === Mode.SINGLE ? 'bg-slate-900' : 'bg-slate-700'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                <span className={`${mode === Mode.MULTI ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
            </Switch>
        </Switch.Group>
    </span>
}

export {Mode, ModeSelector}