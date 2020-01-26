import React from 'react';
import { action } from '@storybook/addon-actions';
import SaveToCollection from './index';
import 'gestalt/dist/gestalt.css';

export default {
  title: 'SaveToCollection',
  component: SaveToCollection,
};


export const Default = () => (
  <SaveToCollection />
)