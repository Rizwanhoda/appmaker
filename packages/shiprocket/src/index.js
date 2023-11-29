import { getCheckout } from './lib/api.js';
import { appmaker, appmakerFunctions } from '@appmaker-xyz/core';
import OneClickCheckout from './pages/oneclickcheckout.js';
import { activateEvents } from './events';
import { configureAnalytics } from './lib';
import { customPaymentSchema } from './lib/oneclick';
const Plugin = {
  id: 'shiprocket',
  name: 'Shiprocket',
  activate,
  pages: {
    OneClickCheckout,
  },
};

export function activate() {
 console.log('activated one click checkout');
  appmakerFunctions.registerAppmakerFn({
    trigger: 'before-open-checkout', // hook to trigger before opening checkout
    namespace: 'oneclick-update-checkout',// namespace for the function
    fn: getCheckout, // map to the function that will be called
  });

  appmaker.addFilter(
    'appmaker-webview-message-data',
    'myCustomFilter', // Replace with your extension id
    myCustomFilterHandler, // Replace with your custom filter handler function
  );



  appmaker.addFilter(
    'webview-custom-url-filters', // hook to add custom url filters
    'oneclick-payment-url-filters', // namespace for the filter
    (currentFilters) => {
      return [...currentFilters, customPaymentSchema]; // add the filter to the list of filters
    },
  );
}
appmaker.registerPlugin(Plugin);
export default Plugin;
