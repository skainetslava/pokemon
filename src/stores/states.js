import { writable } from 'svelte/store';

export const statesStore = writable({
    heightField: 0,
    isPlaying: true
});

export const isPlayingStore = writable(true);