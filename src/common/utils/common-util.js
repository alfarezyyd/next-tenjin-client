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

    const {exp} = this.parseJwt(token.value ?? token); // Decode token untuk mendapatkan `exp`
    if (!exp) return true;
    const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik

    return exp < currentTime; // `true` jika sudah kedaluwarsa, `false` jika masih valid
  }

  static diffForHumans(date) {
    const timestamp = new Date(date);
    const now = new Date();

    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    let diff;
    let unit;

// Tentukan unit waktu berdasarkan selisih
    if (diffInSeconds < 60) {
      diff = diffInSeconds;
      unit = 'second';
    } else if (diffInSeconds < 3600) {
      diff = Math.floor(diffInSeconds / 60);
      unit = 'minute';
    } else if (diffInSeconds < 86400) {
      diff = Math.floor(diffInSeconds / 3600);
      unit = 'hour';
    } else {
      diff = Math.floor(diffInSeconds / 86400);
      unit = 'day';
    }

// Gunakan Intl.RelativeTimeFormat
    const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
    return rtf.format(-diff, unit);
  }
}

