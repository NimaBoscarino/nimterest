import React from 'react';
import { action } from '@storybook/addon-actions';
import CollectionThumbnail from './index';
import 'gestalt/dist/gestalt.css';

import sampleData from './sample_data.json'

export default {
  title: 'CollectionThumbnail',
  component: CollectionThumbnail,
};

export const Default = () => (
  <CollectionThumbnail
    data={sampleData}
  />
);