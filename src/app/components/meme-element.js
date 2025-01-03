import { DomElement } from 'spyne';
import MemeTmpl from './templates/meme.tmpl.html';

/**
 * MemeElement extends DomElement to create a figure element
 */
export class MemeElement extends DomElement {
  constructor(props = {}) {
    // Configure the root <figure class="meme">...
    props.tagName = 'figure';
    props.class = 'meme';
    // Assign the imported HTML template
    props.template = MemeTmpl;

    super(props);
  }
}
