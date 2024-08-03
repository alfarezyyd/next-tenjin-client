import '../../../../public/assets/css/educations.scss'
import AdminWrapper from "@/components/admin/AdminWrapper";

export default function Page(props) {
  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Pengalaman Mentor</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Admin</a></div>
            <div className="breadcrumb-item"><a href="#">Mentor</a></div>
            <div className="breadcrumb-item">Pengalaman</div>
          </div>
        </div>

        <div className="section-body">
          <section className="hero-section">
            <div className="card-grid">
              <a className="card" href="#">
                <div className="card__background"
                     style={{backgroundImage: "url(https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)"}}></div>
                <div className="card__content">
                  <p className="card__category">Category</p>
                  <h3 className="card__heading">Example Card Heading</h3>
                </div>
              </a>
            </div>
          </section>
        </div>
      </section>
    </AdminWrapper>
  )
}