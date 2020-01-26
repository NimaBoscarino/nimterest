import React, { useState, useRef } from 'react'
import { Box, Flyout, Button, Checkbox, Label, Text } from 'gestalt'

const CheckboxWithLabel = ({ id, label }) => {
    const [checked, setChecked] = useState(false)
    return (
        <Box alignItems="center" direction="row" display="flex">
            <Checkbox
                checked={checked}
                id={id}
                onChange={() => setChecked(!checked)}
            />
            <Label htmlFor={id}>
                <Box paddingX={2}>
                    <Text>{label}</Text>
                </Box>
            </Label>
        </Box>
    )
};

const CheckboxExample = () => {
    return (
        <Box display="flex" direction="column" justifyContent="around" marginTop={-1} marginBottom={-1}>
            <Box paddingY={1}>
                <CheckboxWithLabel label="Fun Photos" id="email" />
            </Box>
            <Box paddingY={1}>
                <CheckboxWithLabel label="Music" id="push" />
            </Box>
            <Box paddingY={1}>
                <CheckboxWithLabel label="MM.. FOOD" id="pidgeon" />
            </Box>
        </Box>
    );
}

export default () => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!open)
    const anchorRef = useRef()

    return (
        <Box>
            <Box display="inlineBlock" ref={anchorRef}>
                <Button
                    onClick={toggleOpen}
                    color="red"
                    text="Save"
                />
            </Box>
            {open &&
                <Flyout
                    anchor={anchorRef.current}
                    idealDirection="up"
                    onDismiss={toggleOpen}
                    size="sm"
                >
                    <Box padding={3}>
                        <Text align="center" weight="bold">
                            Choose a collection to save this pin.
                        </Text>
                        <CheckboxExample />
                    </Box>
                </Flyout>}
        </Box>
    );
}