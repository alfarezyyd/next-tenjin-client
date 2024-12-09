export default function AdminFooter() {
  return (<footer className="main-footer">
    <div className="footer-left">
      Copyright &copy; {new Date().getFullYear()}
      <div className="bullet"></div>
      Developed By <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
      Programmer Pemulax
    </a>
    </div>
    <div className="footer-right">
      1.0.0
    </div>
  </footer>)
}