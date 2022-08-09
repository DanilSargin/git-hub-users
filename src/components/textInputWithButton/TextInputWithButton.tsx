import React, {ChangeEventHandler, MouseEventHandler} from "react";
import './styles.scss'

type SearchInputWithButtonProps = {
    value: string | number | readonly string[] | undefined
    onValueChange: ChangeEventHandler<HTMLInputElement>
    placeholder: string
    onSubmit: MouseEventHandler<HTMLInputElement>
    disabled: boolean
}

function SearchInputWithButton ({value, onValueChange, placeholder, onSubmit, disabled}: SearchInputWithButtonProps) {
    return (
        <div className={'searchBlock'}>
            <input className={'input'} placeholder={placeholder} value={value} type={'text'} onChange={onValueChange} />
            <input className={'button'} type={'submit'} disabled={disabled} onClick={onSubmit} name={'Search'}/>
        </div>
    )
}

export default SearchInputWithButton