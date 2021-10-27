import { getElement, getElements } from "../tools/DOM";

export interface IComponentConfig {
	element: HTMLElement;
}

export interface IComponentEventListener {
	element: HTMLElement | Window;
	type: keyof HTMLElementEventMap;
	passParams?: any;

	wrapperFn: (params: any) => void;
}

export abstract class Component<Constructor = IComponentConfig, Params = any> {
	public element: HTMLElement;

	private readonly _eventsListenerArray: IComponentEventListener[] = [];

	protected constructor(config?: Constructor) {
		this.setConfig(config);
	}

	protected init() {
		/* Run function before initialization */
		this.beforeInit && this.beforeInit();

		if (!this.element) {
			return
		}

		this.setDataset();

		/* Run function on resize */
		if (this.onResize) {
			this.addEventListener(window, "resize", this.onResize);
		}

		/* Run function on scroll */
		if (this.onScroll) {
			this.addEventListener(window, 'scroll', this.onScroll);
		}

		/* Run initiation function */
		if (this.onInit) {
			this.onInit();
		}

		/* Run function when element is visible */
		if (this.onVisible) {
			const options = {
				root: null,
				rootMargin: '0px',
				threshold: 0.5
			}

			const observer = new IntersectionObserver((entries) => {
				if (!entries[0].isIntersecting) {
					return;
				}

				this.onVisible();

				observer.unobserve(this.element);
			}, options);

			observer.observe(this.element);
		}

		/* Add component to HTMLElement */
		this.element[this.constructor.name] = this;
	}

	/* Parse constructor params */
	protected setConfig(params: Constructor) {
		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				// @ts-ignore
				this[key] = params[key];
			}
		}
	}

	/** Parse element attribute [data-params] */
	protected setDataset() {
		if (!this.element) {
			return
		}

		const dataset = this.element.dataset.params;

		if (!dataset) {
			return;
		}

		const params = JSON.parse(dataset) as Params;

		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				// @ts-ignore
				this[key] = params[key];
			}
		}
	}

	/** Destroy component */
	public destroy() {
		if (this._eventsListenerArray.length) {
			this._eventsListenerArray.map(event => {
				event.element.removeEventListener(event.type, event.wrapperFn);
			})
		}

		this.onDestroy && this.onDestroy();
	}

	protected getComponentElement<E extends HTMLElement>(value: string): E {
		return getElement(value, this.element);
	};

	protected getComponentElements<E extends HTMLElement>(value: string): NodeListOf<E> {
		return getElements(value, this.element);
	};

	protected addEventListener(element: HTMLElement | Window, type: keyof HTMLElementEventMap, fn: (params: any) => void, passParams?: any) {
		let wrapperFn: (e: MouseEvent) => void;

		element.addEventListener(type, wrapperFn = (e: MouseEvent) => {
			if (passParams) {
				fn(passParams);
			} else {
				fn(e);
			}
		}, false)

		this._eventsListenerArray.push({ element, type, wrapperFn, passParams });
	}

	protected beforeInit?(): void;

	protected onInit?(): void;

	protected onDestroy?(): void;

	protected onVisible?(): void;

	protected onScroll?(): void;

	protected onResize?(): void;
}
