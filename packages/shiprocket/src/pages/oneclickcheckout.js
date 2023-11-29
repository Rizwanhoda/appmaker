export function isOrderCompleted(url) {   
    const regexThankyouPage = /orders\/(.*)$/;
    const isAuthenticatePage = /authenticate/;
    return regexThankyouPage.test(url) && !isAuthenticatePage.test(url);
  }
  
  const onUrlChange = (url, onAction) => {   
    
    if (isOrderCompleted(url)) {
      onAction({
        action: 'SET_ORDER_COMPLETE',
      });
    }
  
    return true;
  };
  
  // This function is called when the back button is pressed
  const getOnBackButtonPressFunction = ({
    webview,
    onAction,
    canGoBack,
    navigation,
    currentUrl,
  }) => {

    return () => {
      // Should return a function
      if (isOrderCompleted(currentUrl)) {
        onAction({
          action: 'RESET',
          replacePage: true,
        });
      } else if (canGoBack) {
        webview.current.goBack();
      } else {
        navigation.goBack();
      }
    };
  };
  
  const OneClickCheckout = {
    id: 'checkout',
    status: 'active',
    title: 'Checkout',
    attributes: {
      renderType: 'normal',
      contentContainerStyle: { flex: 1 },
      rootContainerStyle: { flex: 1 },
      backButtonIconName: 'x',
    },
    blocks: [
      {
        name: 'appmaker/webview',
        isValid: true,
        clientId: 'f496b61a-56c9-4862-b4a5-d5438bb530aa', 
        attributes: {
          loadingLayout: 'home',
          originWhitelist: ['http://*', 'https://*', 'phonepe://*', 'paytmmp://*', 'tez://*', 'upi://*'],
          urlListener: onUrlChange, // this function is called when the url changes and can be used to detect when the order is completed
          getOnBackButtonPressFunction, // back button behaviour
          source: {
            uri: '{{blockData.checkoutUrl}}',
          },
        },
      },
    ],
  };
  export default OneClickCheckout;
  