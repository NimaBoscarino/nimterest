import React from 'react';
import { action } from '@storybook/addon-actions';
import Pin from './index';
import 'gestalt/dist/gestalt.css';

import sampleData from './sample_data.json'

export default {
  title: 'Pin',
  component: Pin,
};

const first = sampleData[0]

export const Default = () => (
  <Pin
    data={{...first}}
  />
);

export const Many = () => (
  <>
  {
    sampleData.map(s => <Pin data={{...s}} />)
  }
  </>
)