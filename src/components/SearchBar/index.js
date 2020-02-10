import React, { useState, useEffect } from 'react'
import { Box, SearchField } from 'gestalt'


export default ({ onChange }) => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        onChange(search)
    }, [search])

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