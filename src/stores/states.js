import { writable } from 'svelte/store';

export const heightFieldStore = writable(0);
export const isPlayingStore = writable(true);
export const isEndedGame = writable(false);