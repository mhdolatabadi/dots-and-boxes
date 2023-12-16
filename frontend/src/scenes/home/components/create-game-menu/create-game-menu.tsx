import * as React from 'react'
import useStyle from './create-game-menu.style'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material'

export default function CreateGameMenu() {
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
          onChange={e => setValue(+e.target.value)}
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
