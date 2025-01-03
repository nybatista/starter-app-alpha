import { ViewStream } from 'spyne';
import PageTmpl from './templates/page-view.tmpl.html';

/**
 * PageView in the Single Active Child (SAC) pattern:
 * 1) Renders its data via PageTmpl.
 * 2) Self-disposes on any future route change.
 */
export class PageView extends ViewStream {
  constructor(props = {}) {
    // A class name keyed by pageId for styling/debugging.
    props.class = `page-view page-view-${props.data.pageId}`;

    /**
     *  The second 'true' parameter in [['CHANNEL_ROUTE', true]]
     *  tells this ViewStream to skip the first emission,
     *  so that the initial event that triggered this
     *  page's creation is ignored, preventing an immediate disposal.
     */
    props.channels = [['CHANNEL_ROUTE', true]];

    // Template file used for layout/content
    props.template = PageTmpl;

    super(props);
  }

  /**
   * Ties CHANNEL_ROUTE_CHANGE_EVENT to disposeViewStream.
   * Once a new route arrives, this PageView removes itself,
   * ensuring only one active page remains at any time.
   */
  addActionListeners() {
    return [['CHANNEL_ROUTE_CHANGE_EVENT', 'disposeViewStream']];
  }
}
