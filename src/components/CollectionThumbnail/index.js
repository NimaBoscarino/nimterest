import React, { useState } from 'react'
import { Collage, Image, Mask } from 'gestalt'

export default ({ data }) => {
    return (
        <Collage
            columns={3}
            height={300}
            width={300}
            renderImage={({ index, width, height }) => {
                const datum = data[index]
                return (
                    <Mask wash width={width} height={height}>
                        <Image
                            alt="collage datum"
                            fit="cover"
                            naturalHeight={datum.height}
                            naturalWidth={datum.width}
                            src={datum.image}
                        />
                    </Mask>
                );
            }}
        />
    )
}