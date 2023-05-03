require('module-alias/register');
const CommonPage = require('@pages/commonPage');

/**
 * FO parent page, contains functions that can be used on all FO page
 * @class
 * @extends CommonPage
 */
class FOBasePage extends CommonPage {
  /**
   * @constructs
   * Setting up texts and selectors to use on all FO pages
   */
  constructor() {
    super();

    // Selectors for home page
    // Header links
    this.content = '#content';
    this.desktopLogo = '#_desktop_logo';
    this.desktopLogoLink = `${this.desktopLogo} a`;
    this.breadCrumbLink = link => `#wrapper nav.breadcrumb a[href*=${link}]`;
    this.cartProductsCount = '#_desktop_cart .cart-products-count';
    this.cartLink = '#_desktop_cart a';
    this.userInfoLink = '#_desktop_user_info';
    this.accountLink = `${this.userInfoLink} .user-info a.account`;
    this.logoutLink = `${this.userInfoLink} .user-info a.logout`;
    this.contactLink = '#contact-link';
    this.categoryMenu = id => `#category-${id} a`;
    this.languageSelectorDiv = '#_desktop_language_selector';
    this.defaultLanguageSpan = `${this.languageSelectorDiv} button span`;
    this.languageSelectorExpandIcon = `${this.languageSelectorDiv} i.expand-more`;
    this.languageSelectorList = `${this.languageSelectorDiv} .js-dropdown.open`;
    this.languageSelectorMenuItemLink = language => `${this.languageSelectorDiv} ul li a[data-iso-code='${language}']`;
    this.currencySelectorDiv = '#_desktop_currency_selector';
    this.defaultCurrencySpan = `${this.currencySelectorDiv} button span`;
    this.currencySelectorExpandIcon = `${this.currencySelectorDiv} i.expand-more`;
    this.currencySelectorMenuItemLink = currency => `${this.currencySelectorExpandIcon} ul li a[title='${currency}']`;
    this.currencySelect = 'select[aria-labelledby=\'currency-selector-label\']';
    this.searchInput = '#search_widget input.ui-autocomplete-input';
    this.autocompleteSearchResult = '.ui-autocomplete';
    this.autocompleteSearchResultItem = `${this.autocompleteSearchResult} .ui-menu-item`;
    this.autocompleteSearchResultItemLink = nthChild => `${this.autocompleteSearchResult} `
      + `.ui-menu-item:nth-child(${nthChild}) a`;

    // Footer links
    // Products links selectors
    this.pricesDropLink = '#link-product-page-prices-drop-1';
    this.newProductsLink = '#link-product-page-new-products-1';
    this.bestSalesLink = '#link-product-page-best-sales-1';
    // Our company links selectors
    this.deliveryLink = '#link-cms-page-1-2';
    this.legalNoticeLink = '#link-cms-page-2-2';
    this.termsAndConditionsOfUseLink = '#link-cms-page-3-2';
    this.aboutUsLink = '#link-cms-page-4-2';
    this.securePaymentLink = '#link-cms-page-5-2';
    this.contactUsLink = '#link-static-page-contact-2';
    this.siteMapLink = '#link-static-page-sitemap-2';
    this.storesLink = '#link-static-page-stores-2';
    // Your account links selectors
    this.footerAccountList = '#footer_account_list';
    this.informationLink = `${this.footerAccountList} a[title='Information']`;
    this.orderTrackingLink = `${this.footerAccountList} a[title='Order tracking']`;
    this.signInLink = `${this.footerAccountList} a[href*='/my-account']`;
    this.createAccountLink = `${this.footerAccountList} a[title='Create account']`;
    this.addressesLink = `${this.footerAccountList} a[title='Addresses']`;
    this.addFirstAddressLink = `${this.footerAccountList} a[title='Add first address']`;
    this.ordersLink = `${this.footerAccountList} a[title='Orders']`;
    this.creditSlipsLink = `${this.footerAccountList} a[title='Credit slips']`;
    this.vouchersLink = `${this.footerAccountList} a[title='Vouchers']`;
    this.wishListLink = `${this.footerAccountList} a[title='My wishlists']`;
    this.signOutLink = `${this.footerAccountList} a[title='Log me out']`;

    // Store information
    this.wrapperContactBlockDiv = '#footer div.block-contact';

    this.footerLinksDiv = '#footer .links';
    this.wrapperDiv = position => `${this.footerLinksDiv} .wrapper:nth-child(${position})`;
    this.wrapperTitle = position => `${this.wrapperDiv(position)} p`;
    this.wrapperSubmenu = position => `${this.wrapperDiv(position)} ul[id*='footer_sub_menu']`;
    this.wrapperSubmenuItemLink = position => `${this.wrapperSubmenu(position)} li a`;

    // Copyright
    this.copyrightLink = '#footer div.footer-container a[href*="www.prestashop-project.org"]';

    // Alert block selectors
    this.alertSuccessBlock = '.alert-success ul li';
    this.notificationsBlock = '#notifications';
  }

  // Header methods
  /**
   * Go to header link
   * @param page {Page} Browser tab
   * @param link {string} Header selector that contain link to click on to
   * @returns {Promise<void>}
   */
  async clickOnHeaderLink(page, link) {
    let selector;

    switch (link) {
      case 'Contact us':
        selector = this.contactLink;
        break;

      case 'Sign in':
        selector = this.userInfoLink;
        break;

      case 'Cart':
        selector = this.cartLink;
        break;

      case 'Logo':
        selector = this.desktopLogoLink;
        break;

      default:
        throw new Error(`The page ${link} was not found`);
    }

    return this.clickAndWaitForNavigation(page, selector);
  }

  /**
   * Click on bread crumb link
   * @param page {Page} Browser tab
   * @param link {string} Link to click on
   * @returns {Promise<void>}
   */
  async clickOnBreadCrumbLink(page, link) {
    await this.clickAndWaitForNavigation(page, this.breadCrumbLink(link));
  }

  /**
   * Go to the home page
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToHomePage(page) {
    await this.waitForVisibleSelector(page, this.desktopLogo);
    await this.clickAndWaitForNavigation(page, this.desktopLogoLink);
  }

  /**
   * Go to login Page
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async goToLoginPage(page) {
    await this.clickAndWaitForNavigation(page, this.userInfoLink);
  }

  /**
   * Logout from FO
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async logout(page) {
    await this.clickAndWaitForNavigation(page, this.logoutLink);
  }

  /**
   * Check if customer is connected
   * @param page {Page} Browser tab
   * @return {Promise<boolean>}
   */
  async isCustomerConnected(page) {
    return this.elementVisible(page, this.logoutLink, 1000);
  }

  /**
   * Click on link to go to account page
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async goToMyAccountPage(page) {
    await this.clickAndWaitForNavigation(page, this.accountLink);
  }

  /**
   * Is language list visible
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  isLanguageListVisible(page) {
    return this.elementVisible(page, this.languageSelectorExpandIcon, 1000);
  }

  /**
   * Get shop language
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  getShopLanguage(page) {
    return this.getAttributeContent(page, 'html[lang]', 'lang');
  }

  /**
   * Change language in FO
   * @param page {Page} Browser tab
   * @param lang {string} Language to choose on the select (ex: en or fr)
   * @return {Promise<void>}
   */
  async changeLanguage(page, lang = 'en') {
    await Promise.all([
      page.click(this.languageSelectorExpandIcon),
      this.waitForVisibleSelector(page, this.languageSelectorList),
    ]);
    await this.clickAndWaitForNavigation(page, this.languageSelectorMenuItemLink(lang));
  }

  /**
   * Get default shop language
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  getDefaultShopLanguage(page) {
    return this.getTextContent(page, this.defaultLanguageSpan);
  }

  /**
   * Return true if language exist in FO
   * @param page {Page} Browser tab
   * @param lang {string} Language to check on the select (ex: en or fr)
   * @return {Promise<boolean>}
   */
  async languageExists(page, lang = 'en') {
    await page.click(this.languageSelectorExpandIcon);
    return this.elementVisible(page, this.languageSelectorMenuItemLink(lang), 1000);
  }

  /**
   * Change currency in FO
   * @param page {Page} Browser tab
   * @param isoCode {string} Iso code of the currency to choose
   * @param symbol {string} Symbol of the currency to choose
   * @return {Promise<void>}
   */
  async changeCurrency(page, isoCode = 'EUR', symbol = '€') {
    // If isoCode and symbol are the same, only isoCode id displayed in FO
    const currency = isoCode === symbol ? isoCode : `${isoCode} ${symbol}`;

    await Promise.all([
      this.selectByVisibleText(page, this.currencySelect, currency, true),
      page.waitForNavigation('newtorkidle'),
    ]);
  }

  /**
   * Get if currency exists on dropdown
   * @param page {Page} Browser tab
   * @param currencyName {string} Name of the currency to check
   * @returns {Promise<boolean>}
   */
  async currencyExists(page, currencyName = 'Euro') {
    await page.click(this.currencySelectorExpandIcon);
    return this.elementVisible(page, this.currencySelectorMenuItemLink(currencyName), 1000);
  }

  /**
   * Get default currency
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  getDefaultCurrency(page) {
    return this.getTextContent(page, this.defaultCurrencySpan);
  }

  /**
   * Go to category
   * @param page {Page} Browser tab
   * @param categoryID {number} Category id from the BO
   * @returns {Promise<void>}
   */
  async goToCategory(page, categoryID) {
    await this.clickAndWaitForNavigation(page, this.categoryMenu(categoryID));
  }

  /**
   * Go to subcategory
   * @param page {Page} Browser tab
   * @param categoryID {number} Category id from the BO
   * @param subCategoryID {number} Subcategory id from the BO
   * @returns {Promise<void>}
   */
  async goToSubCategory(page, categoryID, subCategoryID) {
    await page.hover(this.categoryMenu(categoryID));
    await this.clickAndWaitForNavigation(page, this.categoryMenu(subCategoryID));
  }

  /**
   * Get store information
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async getStoreInformation(page) {
    return this.getTextContent(page, this.wrapperContactBlockDiv);
  }

  /**
   * Get cart notifications number
   * @param page {Page} Browser tab
   * @returns {Promise<number>}
   */
  async getCartNotificationsNumber(page) {
    return this.getNumberFromText(page, this.cartProductsCount, 2000);
  }

  /**
   * Go to cart page
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToCartPage(page) {
    await this.clickAndWaitForNavigation(page, this.cartLink);
  }

  /**
   * Close the  autocomplete search result
   * @param page {Page} Browser tab
   * @returns {void}
   */
  async closeAutocompleteSearch(page) {
    await page.keyboard.press('Escape');
  }

  /**
   * Check if there are autocomplete search result
   * @param page {Page} Browser tab
   * @param productName {string} Product name to search
   * @returns {Promise<boolean>}
   */
  async hasAutocompleteSearchResult(page, productName) {
    await this.setValue(page, this.searchInput, productName);
    return this.elementVisible(page, this.autocompleteSearchResult, 2000);
  }

  /**
   * Get autocomplete search result
   * @param page {Page} Browser tab
   * @param productName {string} Product name to search
   * @returns {Promise<string>}
   */
  async getAutocompleteSearchResult(page, productName) {
    await this.setValue(page, this.searchInput, productName);
    await this.waitForVisibleSelector(page, this.autocompleteSearchResult);
    return this.getTextContent(page, this.autocompleteSearchResult);
  }

  /**
   * Count autocomplete search result
   * @param page {Page} Browser tab
   * @param productName {string} Product name to search
   * @returns {Promise<int>}
   */
  async countAutocompleteSearchResult(page, productName) {
    await this.setValue(page, this.searchInput, productName);
    await this.waitForVisibleSelector(page, this.autocompleteSearchResultItem);
    return page.$$eval(this.autocompleteSearchResultItem, all => all.length);
  }

  /**
   * Search product
   * @param page {Page} Browser tab
   * @param productName {string} Product name to search
   * @returns {Promise<void>}
   */
  async searchProduct(page, productName) {
    await this.setValue(page, this.searchInput, productName);
    await page.keyboard.press('Enter');
    await page.waitForNavigation('networkidle');
  }

  /**
   * Click autocomplete search on the nth result
   * @param page {Page} Browser tab
   * @param productName {string} Product name to search
   * @param nthResult {integer} Nth result to click
   * @returns {Promise<int>}
   */
  async clickAutocompleteSearchResult(page, productName, nthResult) {
    await this.setValue(page, this.searchInput, productName);
    await this.waitForVisibleSelector(page, this.autocompleteSearchResultItem);
    await this.clickAndWaitForNavigation(page, this.autocompleteSearchResultItemLink(nthResult));
  }

  // Footer methods
  /**
   * Get Title of Block that contains links in footer
   * @param page {Page} Browser tab
   * @param position {number} Position of the links on footer
   * @returns {Promise<string>}
   */
  async getFooterLinksBlockTitle(page, position) {
    return this.getTextContent(page, this.wrapperTitle(position));
  }

  /**
   * Get text content of footer links
   * @param page {Page} Browser tab
   * @param position {number} Position of the links on footer
   * @return {Promise<Array<string>>}
   */
  async getFooterLinksTextContent(page, position) {
    return page.$$eval(
      this.wrapperSubmenuItemLink(position),
      all => all.map(el => el.textContent.trim()),
    );
  }

  /**
   * Go to footer link
   * @param page {Page} Browser tab
   * @param textSelector {string} String displayed on footer link to click on
   * @returns {Promise<void>}
   */
  async goToFooterLink(page, textSelector) {
    let selector;

    switch (textSelector) {
      case 'Prices drop':
        selector = this.pricesDropLink;
        break;

      case 'New products':
        selector = this.newProductsLink;
        break;

      case 'Best sales':
        selector = this.bestSalesLink;
        break;

      case 'Delivery':
        selector = this.deliveryLink;
        break;

      case 'Legal Notice':
        selector = this.legalNoticeLink;
        break;

      case 'Terms and conditions of use':
        selector = this.termsAndConditionsOfUseLink;
        break;

      case 'About us':
        selector = this.aboutUsLink;
        break;

      case 'Secure payment':
        selector = this.securePaymentLink;
        break;

      case 'Contact us':
        selector = this.contactUsLink;
        break;

      case 'Sitemap':
        selector = this.siteMapLink;
        break;

      case 'Stores':
        selector = this.storesLink;
        break;

      case 'Information':
        selector = this.informationLink;
        break;

      case 'Order tracking':
        selector = this.orderTrackingLink;
        break;

      case 'Sign in':
        selector = this.signInLink;
        break;

      case 'Create account':
        selector = this.createAccountLink;
        break;

      case 'Addresses':
        selector = this.addressesLink;
        break;

      case 'Add first address':
        selector = this.addFirstAddressLink;
        break;

      case 'Orders':
        selector = this.ordersLink;
        break;

      case 'Credit slips':
        selector = this.creditSlipsLink;
        break;

      case 'Vouchers':
        selector = this.vouchersLink;
        break;

      case 'Wishlist':
        selector = this.wishListLink;
        break;

      case 'Sign out':
        selector = this.signOutLink;
        break;

      default:
        throw new Error(`The page ${textSelector} was not found`);
    }
    return this.clickAndWaitForNavigation(page, selector);
  }

  /**
   * Get copyright
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async getCopyright(page) {
    return this.getTextContent(page, this.copyrightLink);
  }

  /**
   * Check that currency is visible
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  async isCurrencyVisible(page) {
    return this.elementVisible(page, this.currencySelectorDiv, 1000);
  }

  /**
   * Get the value of an input
   *
   * @param page {Page} Browser tab
   * @param input {string} ID of the input
   * @returns {Promise<string>}
   */
  async getInputValue(page, input) {
    return page.inputValue(input);
  }
}

module.exports = FOBasePage;
