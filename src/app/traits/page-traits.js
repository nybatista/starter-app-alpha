import { SpyneTrait } from 'spyne';
import { PageView} from 'components/page-view.js';

export class PageTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'pageTraits$';

    super(context, traitPrefix);
  }

  static pageTraits$HelloWorld() {
    return 'Hello World';
  }

  static pageTraits$onRouteEvent(e) {
    const { change } = e.payload.routeData;
    const data = this.pageTraits$GetPageData(change);
    this.appendView(new PageView({data}), ".stage-view");

    console.log('CHANGE IS ', { change, data });
  }

  static pageTraits$GetPageData(pageId = 'home') {
    const pageDataArr = [
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

    const notFoundPage = {
      pageId: '404',
      title: 'Page Not Found',
      text: 'Oops! The requested page does not exist.',
    };

    // Use .find() to locate the matching page; default to the 404 object if not found.
    return pageDataArr.find((page) => page.pageId === pageId) || notFoundPage;
  }
}
