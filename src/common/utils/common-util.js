export class CommonUtil {
  static parseJwt(token) {
    if (!token) {
      return;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    try {
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
  }

  static isTokenExpired(token) {
    if (!token) return true;

    const {exp} = this.parseJwt(token.value); // Decode token untuk mendapatkan `exp`
    if (!exp) return true;

    const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik
    return exp < currentTime; // `true` jika sudah kedaluwarsa, `false` jika masih valid
  }
}

