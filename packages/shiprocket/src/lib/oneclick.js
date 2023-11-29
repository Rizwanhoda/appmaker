export const getOneClickCheckoutUrl = async (
    checkoutObject,   
  ) => {
    
    let widgetUrl = 'https://deluxe-hotteok-69d1c5.netlify.app/headless/' + '?';
     widgetUrl += '&type=cart';
     widgetUrl += '&platform=' + 'SHOPIFY';
     widgetUrl += '&application=' + 'appmaker'
     widgetUrl += '&domain=' + checkoutObject?.webUrl
     widgetUrl += "&cart=" + JSON.stringify(checkoutObject?.lineItems?.edges)

    const url = widgetUrl;

    return url;
  };

  // you can filter the urls that you get in checkout page here
export const customPaymentSchema = {  
  id: 'oneclick-payment-schema',
  regex: [
    /phonepe:\/\/pay\?.*/i,
    /paytm:\/\/upi\/pay?.*/i,
    /paytmmp:\/\/pay?.*/i,
    /upi:\/\/pay?.*/i,
    /tez:\/\/upi\/pay?.*/i,
  ],
  action: (url) => {
    return {
      action: 'OPEN_URL',
      params: {
        url,
      },
    };
  },
};
