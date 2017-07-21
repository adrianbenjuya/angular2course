import { UpgradeProjectPage } from './app.po';

describe('upgrade-project App', () => {
  let page: UpgradeProjectPage;

  beforeEach(() => {
    page = new UpgradeProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
