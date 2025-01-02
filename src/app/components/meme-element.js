import { DomElement } from 'spyne';
import MemeTmpl from './templates/meme.tmpl.html';
export class MemeElement extends DomElement {
  constructor(props = {}) {
    props.tagName = 'figure';
    props.class = 'mashup';
    props.template = MemeTmpl;
    super(props);
  }
}
