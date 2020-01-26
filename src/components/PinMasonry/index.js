import React, { useState } from 'react'
import { Masonry, Text } from 'gestalt'
import Pin from '../Pin'

export default ({ pins }) => {
    if (pins.length > 0) {
        return (
            <Masonry
                comp={Pin}
                items={pins}
                // loadItems={this.loadItems}
                minCols={1}
            />
        )
    } else {
        return (
            <Text
                align="center"
            >There are 0 results.</Text>
        )
    }
}