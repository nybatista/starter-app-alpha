import { SpyneTrait } from 'spyne';
import { PageView } from 'components/page-view.js';

export class PageTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'pageTraits$';
    super(context, traitPrefix);
  }

  static pageTraits$onRouteEvent(e) {
    // 'change' is the default root Route Property
    const { change } = e.payload.routeData;

    // locate the active nav anchor and add the .selected class
    this.props.el$('nav a').setActiveItem('selected', `.link-${change}`);

    // get current page data and load into new PageView
    const data = this.pageTraits$GetDataByPageId(change);
    this.appendView(new PageView({ data }), '.stage-view');
  }

  static pageTraits$GetDataByPageId(pageId = 'home') {
    const notFoundPage = {
      pageId: '404',
      title: 'Page Not Found',
      text: 'Oops! The requested page does not exist.',
    };

    // Use Array.prototype.find to locate page data or return 404 data
    return (
      this.props.data.find((page) => page.pageId === pageId) || notFoundPage
    );
  }

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
