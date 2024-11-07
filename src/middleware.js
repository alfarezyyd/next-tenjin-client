// middleware.js
import {NextResponse} from 'next/server';

export function middleware(request) {
  const {pathname} = request.nextUrl;

  // Hanya melindungi path yang dimulai dengan '/admin'
  if (pathname.startsWith('/admin')) {
    // Ambil token dari cookies menggunakan request.cookies
    const token = request.cookies.get('accessToken');
    console.log(token);

    // Jika tidak ada token, arahkan ke halaman login
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Jika ada token, lanjutkan ke halaman yang diminta
    return NextResponse.next();
  }

  // Untuk path lainnya, lanjutkan request tanpa modifikasi
  return NextResponse.next();
}

// middleware.js
export const config = {
  matcher: ['/admin/:path*'],  // Terapkan middleware hanya di /admin dan sub-pathnya
};
