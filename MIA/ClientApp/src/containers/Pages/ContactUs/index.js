import React from "react";

import "sass/contactus.scss";

class ContactUs extends React.PureComponent {
  render() {
    return (
      <section id="contact_us">
        <div className="container">
          <div className="map_area">
            <div className="title">Contact us</div>
            <div className="content">
              <div className="contact_info">
                <div className="item">
                  <span>
                    <i className="icofont-google-map"></i>Address
                  </span>
                  <p>Dubai, Dubai Media City, Building No. 1, Second Floor - Office No. 214</p>
                </div>
                <div className="item">
                  <span>
                    <i className="icofont-phone"></i>Phone
                  </span>
                  <p>+971 4 57 2636 7</p>
                  <p>+971 4 57 2636 8</p>
                </div>
                <div className="item">
                  <span>
                    <i className="icofont-fax"></i>Fax
                  </span>
                  <p>+971 4 57 2636 6</p>
                </div>
                <div className="item">
                  <span>
                    <i className="icofont-email"></i>Mail
                  </span>
                  <p>Info@mediaindustry.me</p>
                </div>
              </div>
              <div className="google_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57754.16425696088!2d55.24657784522731!3d25.216057688437235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2seg!4v1579277859447!5m2!1sen!2seg"
                  width="600"
                  height="450"
                  frameborder="0"
                  style={{ border: 0 }}
                  allowfullscreen=""
                ></iframe>
              </div>
            </div>
          </div>
          <div className="form_area">
            <div className="title">Get In Touch</div>
            <div className="content">
              <div className="form_contact">
                <div className="item">
                  <input type="text" placeholder="Name*" />
                </div>
                <div className="item">
                  <input type="email" placeholder="E-mail*" />
                </div>
                <div className="item">
                  <input type="number" placeholder="Phone" />
                </div>
                <div className="item">
                  <select name="" id="">
                    <option value="" selected>
                      Message Subject*
                    </option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                    <option value="">Subject</option>
                  </select>
                </div>
                <div className="item">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Type here your Comment"></textarea>
                </div>
                <button type="submit">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ContactUs;
