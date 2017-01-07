import { TalksPage } from './app.po';

describe('talks App', function() {
  let page: TalksPage;

  beforeEach(() => {
    page = new TalksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
