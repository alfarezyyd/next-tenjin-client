import './fonts.css'
import Providers from "@/app/providers";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Tenjin Platform", description: "Meet your Expert Mentor",
};

export default function RootLayout({children}) {
  return (<html lang="en">
  <head>
    <title>Tenjin Platform</title>
    <link
      rel="icon"
      href="/images/logo-fav-icon.png"
      type="image/png"
      sizes="512"
    />
  </head>
  <body className="w-full m-0 p-0">
  <Providers>{children}</Providers>
  </body>
  </html>);
}
