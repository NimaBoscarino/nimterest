import React from 'react';
import { action } from '@storybook/addon-actions';
import PinMasonry from './index';
import 'gestalt/dist/gestalt.css';

import sampleData from './sample_data.json'

export default {
  title: 'PinMasonry',
  component: PinMasonry,
};


var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

const shuffled = shuffle(sampleData.slice());

export const Many = () => (
  <PinMasonry pins={shuffled} />
)

export const Empty = () => (
	<PinMasonry pins={[]} />
)