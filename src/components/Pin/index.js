import React, { useState } from 'react'
import { Box, Touchable, IconButton, Button, Image, Heading, Text, Mask } from 'gestalt'
import SaveToCollection from '../SaveToCollection'

export default ({ data }) => {
    const { image, title, author, height, width } = data

    const [visible, setVisible] = useState('none')
    const [liked, setLiked] = useState(false)

    return (
        <Box maxWidth={236} padding={2} column={12}>
            <Touchable
                onMouseEnter={() => setVisible('flex')}
                onMouseLeave={() => setVisible('none')}
            >
                <Box position="relative">
                    <Mask
                        shape="rounded"
                    >
                        <Image
                            naturalHeight={height}
                            naturalWidth={width}
                            src={image}
                        />
                    </Mask>
                    <Box
                        display={visible}
                        position="absolute"
                        padding={2}
                        top
                        right
                    >
                        <SaveToCollection />
                    </Box>
                    <Box
                        position="absolute"
                        display={visible}
                        bottom
                        left
                        padding={2}
                    >
                        <Button
                            color="gray"
                            text="Open"
                            inline
                        />
                    </Box>
                    <Box
                        display={visible}
                        position="absolute"
                        padding={2}
                        bottom
                        right
                    >
                        <IconButton
                            accessibilityLabel="Love"
                            bgColor="white"
                            icon="heart"
                            iconColor={liked ? "red" : "gray"}
                            onClick={() => setLiked(!liked) }
                        />
                    </Box>

                </Box>

                <Heading size="xs">{ title }</Heading>
                <Text align="left">{ author }</Text>
            </Touchable>
        </Box>
    )
}