import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";

class Home extends React.Component {
  componentDidMount() {}

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="left-sidebar-pro">
          <LeftMenu />
        </div>
        <div className="content-inner-all">
          <div className="header-top-area">
            <div className="fixed-header-top">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-1 col-md-6 col-sm-6 col-xs-12">
                    <button type="button" id="sidebarCollapse" className="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn">
                      <i className="fa fa-bars"></i>
                    </button>
                    <div className="admin-logo logo-wrap-pro">
                      <a href="#">
                        {/* style="    width: 62px;" */}
                        <img src="./img/logo/log.png" alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-1 col-sm-1 col-xs-12">
                    <div className="header-top-menu tabl-d-n"></div>
                  </div>

                  <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                    <div className="header-right-info">
                      <ul className="nav navbar-nav mai-top-nav header-right-menu">
                        <Notification />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BreadCrumb />
          {children}
        </div>
      </React.Fragment>
    );
  }
}

const BreadCrumb = () => <div />;
const UserProfile = () => <div />;
const Notification = () => (
  <li className="nav-item">
    <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
      <span className="adminpro-icon adminpro-user-rounded header-riht-inf"></span>
      <span className="admin-name">Advanda Cro</span>
      <span className="author-project-icon adminpro-icon adminpro-down-arrow"></span>
    </a>
    <ul role="menu" className="dropdown-header-top author-log dropdown-menu animated flipInX">
      <li>
        <a href="#">
          <span className="adminpro-icon adminpro-home-admin author-log-ic"></span>My Account
        </a>
      </li>
      <li>
        <a href="#">
          <span className="adminpro-icon adminpro-user-rounded author-log-ic"></span>My Profile
        </a>
      </li>
      <li>
        <a href="#">
          <span className="adminpro-icon adminpro-money author-log-ic"></span>User Billing
        </a>
      </li>
      <li>
        <a href="#">
          <span className="adminpro-icon adminpro-settings author-log-ic"></span>Settings
        </a>
      </li>
      <li>
        <a href="#">
          <span className="adminpro-icon adminpro-locked author-log-ic"></span>Log Out
        </a>
      </li>
    </ul>
  </li>
);
const LeftMenu = () => (
  <div className="left-sidebar-pro">
    <nav id="sidebar">
      <div className="sidebar-header">
        <a href="#">
          <img src="img/message/1.jpg" alt="" />
        </a>
        <h3>Andrar Son</h3>
        <p>Developer</p>
        <strong>AP+</strong>
      </div>
      <div className="left-custom-menu-adp-wrap">
        <ul className="nav navbar-nav left-sidebar-menu-pro">
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-home"></i> <span className="mini-dn">Home</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown animated flipInX">
              <a href="dashboard.html" className="dropdown-item">
                Dashboard v.1
              </a>
              <a href="dashboard-2.html" className="dropdown-item">
                Dashboard v.2
              </a>
              <a href="analytics.html" className="dropdown-item">
                Analytics
              </a>
              <a href="widgets.html" className="dropdown-item">
                Widgets
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-envelope"></i> <span className="mini-dn">Mailbox</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown animated flipInX">
              <a href="inbox.html" className="dropdown-item">
                Inbox
              </a>
              <a href="view-mail.html" className="dropdown-item">
                View Mail
              </a>
              <a href="compose-mail.html" className="dropdown-item">
                Compose Mail
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-flask"></i> <span className="mini-dn">Interface</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown animated flipInX">
              <a href="google-map.html" className="dropdown-item">
                Google Map
              </a>
              <a href="data-maps.html" className="dropdown-item">
                Data Maps
              </a>
              <a href="pdf-viewer.html" className="dropdown-item">
                Pdf Viewer
              </a>
              <a href="x-editable.html" className="dropdown-item">
                X-Editable
              </a>
              <a href="code-editor.html" className="dropdown-item">
                Code Editor
              </a>
              <a href="tree-view.html" className="dropdown-item">
                Tree View
              </a>
              <a href="preloader.html" className="dropdown-item">
                Preloader
              </a>
              <a href="images-cropper.html" className="dropdown-item">
                Images Cropper
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-pie-chart"></i> <span className="mini-dn">Miscellaneous</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown animated flipInX">
              <a href="profile.html" className="dropdown-item">
                Profile
              </a>
              <a href="contact-client.html" className="dropdown-item">
                Contact Client
              </a>
              <a href="contact-client-v.1.html" className="dropdown-item">
                Contact Client v.1
              </a>
              <a href="project-list.html" className="dropdown-item">
                Project List
              </a>
              <a href="project-details.html" className="dropdown-item">
                Project Details
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-bar-chart-o"></i> <span className="mini-dn">Charts</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown chart-left-menu-std animated flipInX">
              <a href="bar-charts.html" className="dropdown-item">
                Bar Charts
              </a>
              <a href="line-charts.html" className="dropdown-item">
                Line Charts
              </a>
              <a href="area-charts.html" className="dropdown-item">
                Area Charts
              </a>
              <a href="rounded-chart.html" className="dropdown-item">
                Rounded Charts
              </a>
              <a href="c3.html" className="dropdown-item">
                C3 Charts
              </a>
              <a href="sparkline.html" className="dropdown-item">
                Sparkline Charts
              </a>
              <a href="peity.html" className="dropdown-item">
                Peity Charts
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-table"></i> <span className="mini-dn">Data Tables</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown animated flipInX">
              <a href="static-table.html" className="dropdown-item">
                Static Table
              </a>
              <a href="data-table.html" className="dropdown-item">
                Data Table
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-edit"></i> <span className="mini-dn">Forms Elements</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown form-left-menu-std animated flipInX">
              <a href="basic-form-element.html" className="dropdown-item">
                Basic Elements
              </a>
              <a href="advance-form-element.html" className="dropdown-item">
                Advance Elements
              </a>
              <a href="password-meter.html" className="dropdown-item">
                Password Meter
              </a>
              <a href="multi-upload.html" className="dropdown-item">
                Multi Upload
              </a>
              <a href="tinymc.html" className="dropdown-item">
                Text Editor
              </a>
              <a href="dual-list-box.html" className="dropdown-item">
                Dual List Box
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-desktop"></i> <span className="mini-dn">App views</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown apps-left-menu-std animated flipInX">
              <a href="notifications.html" className="dropdown-item">
                Notifications
              </a>
              <a href="alerts.html" className="dropdown-item">
                Alerts
              </a>
              <a href="modals.html" className="dropdown-item">
                Modals
              </a>
              <a href="buttons.html" className="dropdown-item">
                Buttons
              </a>
              <a href="tabs.html" className="dropdown-item">
                Tabs
              </a>
              <a href="accordion.html" className="dropdown-item">
                Accordion
              </a>
              <a href="tab-menus.html" className="dropdown-item">
                Tab Menus
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
              <i className="fa big-icon fa-files-o"></i> <span className="mini-dn">Pages</span>{" "}
              <span className="indicator-right-menu mini-dn">
                <i className="fa indicator-mn fa-angle-left"></i>
              </span>
            </a>
            <div role="menu" className="dropdown-menu left-menu-dropdown pages-left-menu-std animated flipInX">
              <a href="login.html" className="dropdown-item">
                Login
              </a>
              <a href="register.html" className="dropdown-item">
                Register
              </a>
              <a href="captcha.html" className="dropdown-item">
                Captcha
              </a>
              <a href="checkout.html" className="dropdown-item">
                Checkout
              </a>
              <a href="contact.html" className="dropdown-item">
                Contacts
              </a>
              <a href="review.html" className="dropdown-item">
                Review
              </a>
              <a href="order.html" className="dropdown-item">
                Order
              </a>
              <a href="comment.html" className="dropdown-item">
                Comment
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
