export const getElementID = (value: string): HTMLElement => {
	return document.getElementById(value);
}

export const getElements = <E extends Element = HTMLElement>(value: string, element?: HTMLElement): NodeListOf<E> => {
	if (element) {
		return element.querySelectorAll(value);
	}

	return document.querySelectorAll(value);
}

export const getElement = <E extends Element = HTMLElement>(value: string, element?: HTMLElement): E => {
	if (element) {
		return element.querySelector(value);
	}

	return document.querySelector(value);
}
