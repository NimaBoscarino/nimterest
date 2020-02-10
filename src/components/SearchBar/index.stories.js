import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchBar from './index';
import 'gestalt/dist/gestalt.css';

export default {
  title: 'SearchBar',
  component: SearchBar,
};

export const Default = () => (
  <SearchBar />
);