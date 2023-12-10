import { ChangeEvent } from "react"
import { FieldRenderProps } from 'react-final-form'
import { TextField, TextFieldProps } from "@mui/material"

type Props = FieldRenderProps<string, HTMLElement> & TextFieldProps;

const TextInputField = ({ input, meta, ...rest }: Props) => (
    <TextField
        {...input}
        {...rest}
        variant="standard"
        onChange={(_e: ChangeEvent<HTMLInputElement>) => input.onChange(_e.target.value)}
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched ? meta.error : ''}
    />
)

export { TextInputField }