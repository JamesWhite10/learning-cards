import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import S from './MyTextInput.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    errorClassName?: string
    variant?: "light" | "dark" | "standard" | "purple"
}

export const MyTextInput: React.FC<SuperInputTextPropsType> = props => {
    const {type = "text", onChange, onChangeText, onKeyPress, onEnter, error,
        className, errorClassName, variant = "light", ...restProps} = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }

    const finalInputClassName = `${S.input} ${variant && S[variant]} ${className} ${error && S.errorInput}`
    const finalErrorClassName = `${S.error} ${errorClassName || ''}`

    return (
        <div className={S.textInput}>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {error && <span className={finalErrorClassName}>{error}</span>}
        </div>
    )
}