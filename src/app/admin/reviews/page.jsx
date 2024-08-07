import AdminWrapper from "@/components/admin/AdminWrapper";

export default function Page() {
  return (
    <AdminWrapper>
      <section className="section">
        <div className="section-header">
          <h1>Tickets</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
            <div className="breadcrumb-item">Tickets</div>
          </div>
        </div>

        <div className="section-body">
          <h2 className="section-title">Help Your Customer</h2>
          <p className="section-lead">
            Some customers need your help.
          </p>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Tickets</h4>
                </div>
                <div className="card-body">
                  <a href="#" className="btn btn-primary btn-icon icon-left btn-lg btn-block mb-4 d-md-none"
                     data-toggle-slide="#ticket-items">
                    <i className="fas fa-list"></i> All Tickets
                  </a>
                  <div className="tickets">
                    <div className="ticket-items" id="ticket-items">
                      <div className="ticket-item active">
                        <div className="ticket-title">
                          <h4>Technical problem</h4>
                        </div>
                        <div className="ticket-desc">
                          <div>Farhan A. Mujib</div>
                          <div className="bullet"></div>
                          <div>2 min ago</div>
                        </div>
                      </div>
                      <div className="ticket-item">
                        <div className="ticket-title">
                          <h4>Cancel my order please!</h4>
                        </div>
                        <div className="ticket-desc">
                          <div>Amanda Aprilia Azmi</div>
                          <div className="bullet"></div>
                          <div>Yesterday</div>
                        </div>
                      </div>
                      <div className="ticket-item">
                        <div className="ticket-title">
                          <h4>Where is my mother?</h4>
                        </div>
                        <div className="ticket-desc">
                          <div>Irwansyah Saputra</div>
                          <div className="bullet"></div>
                          <div>July 18, 2018</div>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-content">
                      <div className="ticket-header">
                        <div className="ticket-sender-picture img-shadow">
                          <img src="../assets/img/avatar/avatar-5.png" alt="image"/>
                        </div>
                        <div className="ticket-detail">
                          <div className="ticket-title">
                            <h4>Technical Problem</h4>
                          </div>
                          <div className="ticket-info">
                            <div className="font-weight-600">Farhan A. Mujib</div>
                            <div className="bullet"></div>
                            <div className="text-primary font-weight-600">2 min ago</div>
                          </div>
                        </div>
                      </div>
                      <div className="ticket-description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="gallery">
                          <div className="gallery-item" data-image="../assets/img/news/img01.jpg"
                               data-title="Image 1"></div>
                          <div className="gallery-item" data-image="../assets/img/news/img02.jpg"
                               data-title="Image 2"></div>
                          <div className="gallery-item" data-image="../assets/img/news/img03.jpg"
                               data-title="Image 3"></div>
                          <div className="gallery-item gallery-more" data-image="../assets/img/news/img04.jpg"
                               data-title="Image 4">
                            <div>+2</div>
                          </div>
                        </div>

                        <div className="ticket-divider"></div>

                        <div className="ticket-form">
                          <form>
                            <div className="form-group">
                              <textarea className="summernote form-control" placeholder="Type a reply ..."></textarea>
                            </div>
                            <div className="form-group text-right">
                              <button className="btn btn-primary btn-lg">
                                Reply
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </AdminWrapper>
  )
}