export class TokenAdmin {
    constructor() {}
  
    setToken(name, data) {
      sessionStorage.setItem(name, JSON.stringify(data));
      return true;
    }
  
    getToken(name) {
      if (sessionStorage.getItem(name)) {
        let data = sessionStorage.getItem(name);
        return data;
      }
      return "not found";
    }
  
    clearToken(name) {
      sessionStorage.removeItem(name);
      return true;
    }
  }