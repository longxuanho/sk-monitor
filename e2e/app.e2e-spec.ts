import { SkMonitorPage } from './app.po';

describe('sk-monitor App', () => {
  let page: SkMonitorPage;

  beforeEach(() => {
    page = new SkMonitorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
