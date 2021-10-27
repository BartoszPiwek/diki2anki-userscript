import { Entity } from './class/entity';
import { getElements } from './tools/DOM';

(() => {
  const entityHTMLElements = getElements('.diki-results-left-column .dictionaryEntity');

  if (!entityHTMLElements.length) {
    return;
  }

  entityHTMLElements.forEach(element => {
    new Entity({ element }).onInit();
  })
})();
