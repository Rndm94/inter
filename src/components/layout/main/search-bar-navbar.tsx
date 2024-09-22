import { Stack, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const SearchBarNavBar = () => {
  return (
    <Stack
      ml={2}
      mr={10}
      direction="row"
      color="GrayText"
      gap={1}
      sx={{ cursor: "text" }}
      flex={1}
      alignItems='center'
    >
      <SearchIcon /> <Typography textAlign="center">Buscar</Typography>
    </Stack>
  )
}

export default SearchBarNavBar
