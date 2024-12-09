export default function ErrorPageAdmin() {
  return (
    <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="page-error">
            <div className="page-inner">
              <h1>404</h1>
              <div className="page-description">
                The page or data you were looking for could not be found.
              </div>
              <div className="page-search">
                <div className="mt-3">
                  <a href="/admin/dashboard">Back to Dashboard</a>
                </div>
              </div>
            </div>
          </div>
          <div className="simple-footer mt-5">
            Copyright &copy; Programmer Pemulax {new Date().getFullYear()}
          </div>
        </div>
      </section>
    </div>
  )
}