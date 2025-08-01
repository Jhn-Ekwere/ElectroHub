let localStorage = window.localStorage;


export function clearSavedInfo() {
  localStorage.removeItem("saved");
}

export function storeSavedInfo(info: any) {
  localStorage.setItem('saved', JSON.stringify(info));
}

export function getSavedInfo() {
  let savedInfo: any = localStorage.getItem("saved");
  if (savedInfo) {
    try {
      savedInfo = JSON.parse(savedInfo)
    } catch (e) {
      savedInfo = null
      
    }
  }
  return savedInfo;
}

export function storeCartInfo(cartInfo: any) {
  localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
}

export function getCartInfo() {
  let cartInfo: any = localStorage.getItem("cartInfo");
  if (cartInfo) {
    try {
      cartInfo = JSON.parse(cartInfo);
    } catch (e) {
      cartInfo = {};
    }
  }

  return cartInfo;
}

export function clearCartInfo() {
  localStorage.removeItem("cartInfo");
}


export function storeBusinessAuthInfo(authInfo: any) {
  localStorage.setItem("businessAuthInfo", JSON.stringify(authInfo));
}

export function getBusinessAuthInfo() {
  let authInfo:any = localStorage.getItem("businessAuthInfo");
  if (authInfo) {
    try {
      authInfo = JSON.parse(authInfo);
    } catch (e) {
      authInfo = {};
    }
  }

  return authInfo;
}

export function clearBusinessAuthInfo() {
  localStorage.removeItem("businessAuthInfo");
}
