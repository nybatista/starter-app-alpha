import { SpyneTrait } from 'spyne';
import { PageView } from 'components/page-view.js';

/**
 * PageTraits demonstrates a Single Active Page pattern:
 * - Listens for route changes and updates the displayed page.
 * - Maintains a small page-data array (title, text).
 */
export class PageTraits extends SpyneTrait {
  /**
   * The traitPrefix enforces consistent naming for trait methods (e.g. pageTraits$MethodName).
   * SpyneJS logs warnings if methods don't match this prefix, helping keep code organized.
   */
  constructor(context) {
    let traitPrefix = 'pageTraits$';
    super(context, traitPrefix);
  }

  /**
   * Called when a ROUTE change event is received (e.g., CHANNEL_ROUTE_CHANGE_EVENT).
   * 1) Extracts the new route, defaulting to 'home'.
   * 2) Highlights the corresponding nav link.
   * 3) Looks up the page data and appends a new PageView into the .stage-view container.
   *
   * @param {Object} e - An event object with payload.routeData.change,
   *                     typically the pageId to navigate to.
   */
  static pageTraits$onRouteEvent(e) {
    // Use 'home' if no route is specified
    const { change = 'home' } = e.payload.routeData;

    // Mark the active nav link with .selected class
    this.props.el$('nav a').setActiveItem('selected', `.link-${change}`);

    // Retrieve the associated page data, or a 404-like object if not found
    const data = this.pageTraits$GetDataByPageId(change);

    // Instantly append a new PageView in the .stage-view area,
    // disposing any previously appended child ViewStream
    this.appendView(new PageView({ data }), '.stage-view');
  }

  /**
   * Looks up the page object by its pageId in this.props.data
   * or returns a 404-like object if no match is found.
   *
   * @param {String} pageId - The requested page identifier.
   * @returns {Object} The matching page object or a notFound fallback.
   */
  static pageTraits$GetDataByPageId(pageId = 'home') {
    const notFoundPage = {
      pageId: '404',
      title: 'Page Not Found',
      text: 'Oops! The requested page does not exist.',
    };

    return (
      this.props.data.find((page) => page.pageId === pageId) || notFoundPage
    );
  }

  /**
   * Provides an array of page objects used by pageTraits$GetDataByPageId().
   * This could be replaced by a dynamic data source or ChannelFetch in a larger app.
   */
  static pageTraits$GetPageData() {
    return [
      {
        pageId: 'home',
        title: 'Home',
        text: 'Welcome to our starter SpyneJS application! Here you’ll find basic instructions and links to other pages.',
      },
      {
        pageId: 'features',
        title: 'Features',
        text: 'Learn about our single active page pattern, dark mode styling, and other capabilities.',
      },
      {
        pageId: 'about',
        title: 'About Us',
        text: 'We are dedicated to building intuitive single-page applications with SpyneJS. Our team is passionate about modular, maintainable code.',
      },
      {
        pageId: 'contact',
        title: 'Contact',
        text: 'Got questions or feedback? Reach out via our contact page or follow us on social media.',
      },
    ];
  }
}
