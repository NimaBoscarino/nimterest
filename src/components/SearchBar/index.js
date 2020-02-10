import React, { useState } from 'react'
import { Box, SearchField } from 'gestalt'


export default () => {
    const [search, setSearch] = useState("")

    // useDebounce to console.log search value after 100ms

    return (
        <Box paddingX={2}>
            <SearchField
                accessibilityLabel="Demo Search Field"
                id="searchField"
                onChange={({ value }) => setSearch(value)}
                placeholder="Search and explore"
                value={search}
            />
        </Box>
    )
}