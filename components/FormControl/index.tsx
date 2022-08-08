import {
  TextField,
  FormControl
} from '@mui/material'

export default function FormInput(props) {
  return (
    <FormControl style={{ marginBottom: '1rem' }} {...props.base} >
      <TextField inputRef={props.refs} {...props.input}></TextField>
    </FormControl>
  )
}
