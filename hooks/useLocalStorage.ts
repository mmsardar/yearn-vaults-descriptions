import {useState} from 'react';

function useLocalStorage(key: string, initialValue: string): [string, (value: string | ((s?: string) => string)) => void] {

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, set_storedValue] = useState((): string => {
		try {
			if (typeof window === 'undefined') {

				return initialValue;
			}
			// Get from local storage by key
			const item = window.localStorage.getItem(key);

			// Parse stored json or if none return initialValue
			return item !== null ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.warn(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const set_value = (value: (string | ((s?: string) => string))): void => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			set_storedValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.warn(error);
		}
	};

	return [storedValue, set_value];
}

export default useLocalStorage;
