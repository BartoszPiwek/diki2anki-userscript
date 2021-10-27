import { Component, IComponentConfig } from "../abstract/component.abstract";

export interface IEntity extends IComponentConfig {
}

export class Entity extends Component implements IEntity {
  private title: string[] = [];
  private partOfSpeech: string;

  constructor(config: IEntity) {
    super(config);
  }

  onInit() {
    const titleEls = this.getComponentElement('h1').querySelectorAll('.hw');

    titleEls.forEach(element => {
      if (element.classList.length != 1) {
        return
      }

      this.title.push(element.textContent.trim());
    });

    partOfSpeech
  }

  public getTitles() {
    const titlesWrapper = this.getComponentElement('h1');

    if (!titlesWrapper) {
      return;
    }

    const titleEls = titlesWrapper.querySelectorAll('.plainLink');

    if (!titleEls.length) {
      return;
    }

    titleEls.forEach(element => {
      if (element.classList.length != 1) {
        return
      }

      this.title.push(element.textContent.trim());
    });
  }
}