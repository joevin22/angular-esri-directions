import { Angular2EsriLoaderPage } from './app.po';

describe('angular2-esri-loader App', () => {
  let page: Angular2EsriLoaderPage;

  beforeEach(() => {
    page = new Angular2EsriLoaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
