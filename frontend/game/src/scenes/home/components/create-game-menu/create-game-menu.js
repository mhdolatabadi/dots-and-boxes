import * as React from 'react'
// style
import useStyle from './create-game-menu.style'
// localiztion
import t from './create-game-menu.local'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@material-ui/core'

export default function CreateGameMenu(props) {
  const classes = useStyle()

  const [value, setValue] = React.useState(6)

  return (
    <Stack>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="size"
          onChange={e => setValue(e.target.value)}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
        <FormHelperText>size of paper</FormHelperText>
      </FormControl>
    </Stack>
  )
}
