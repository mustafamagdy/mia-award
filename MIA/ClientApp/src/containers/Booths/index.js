import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { fileToBase64 } from "utils";
import { ImageZoom } from "react-simple-image-zoom";
import { Form, Formik } from "formik";
import { Field, LocalizedDataField } from "components/Forms";
import config from "config";

const Booths = ({ fetchBooths, booths, boothBooked, bookBooth, ...props }) => {
  useEffect(() => {
    setLoading(false);
    if (booths == undefined || booths.length == 0) {
      setNoMoreBooths(true);
    } else {
      setNoMoreBooths(false);
    }
  }, [booths]);

  useEffect(() => {
    setLoading(true);
    fetchBooths();
  }, []);

  const tabs = ["info", "details", "payment"];
  const [loading, setLoading] = useState(false);
  const [noMoreBooths, setNoMoreBooths] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");
  // const [paymentToken, setPaymentToken] = useState(undefined);
  // const [useOnlinePayment, setUseOnlinePayment] = useState(true);

  const handleActiveTab = (tabKey) => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };

  const nextStep = () => {
    const activeTab = tabs[activeIndex + 1];
    if (activeTab) {
      handleActiveTab(activeTab);
    }
  };

  return (
    <section id="booth_page">
      <div className="container">
        <div className="booth_row">
          <div className="col_left">
            <div className="imgthumb">
              <ImageZoom
                portalId="zoom-img"
                largeImgSrc="assets/images/booth_image.png"
                imageWidth={656}
                imageHeight={175}
                zoomContainerWidth={500}
                zoomContainerHeight={500}
                portalStyle={Object.assign(
                  { ...ImageZoom.defaultPortalStyle },
                  { top: "140px" }
                )}
                zoomScale={5}
                responsive={true}
              >
                <img src="assets/images/booth_image_small.png" alt="" />
              </ImageZoom>
              {/* <span>
                <i className="icofont-ui-zoom-in"></i>
              </span> */}
            </div>
          </div>
          <div className="col_right">
            {loading == true ? (
              <div>Loading ...</div>
            ) : noMoreBooths == true ? (
              <div className="no_more_booths">
                <Trans id="sold_out">Soldout</Trans>
              </div>
            ) : boothBooked == true ? (
              <Confirmation active={boothBooked} success={true} />
            ) : (
              <>
                <div id="zoom-img" />
                <div className="tabs_links">
                  <ul>
                    <TabList
                      activeClassName="active"
                      activeIndex={activeIndex}
                      activeTabKey={activeTabKey}
                      handleActiveTabWithKey={handleActiveTab}
                    >
                      {tabs.map((t, i) => (
                        <Tab key={t} tabKey={t}>
                          <li>
                            <Trans id={t}>{t}</Trans>
                          </li>
                        </Tab>
                      ))}
                    </TabList>
                  </ul>
                </div>
                <div className="tabs_content">
                  <Formik
                    initialValues={{
                      boothCode: "",
                      companyName: "",
                      nationality: "",
                      address: "",
                      phone: "",
                      fax: "",
                      websiteUrl: "",
                      contactPersonName: "",
                      contactPersonTitle: "",
                      cellPhone1: "",
                      cellPhone2: "",
                      email: "",
                      extraDetails: "",
                      companyFieldOfBusiness: "",
                      screenOption: false,
                      printingOption: false,

                      payment: {
                        receiptAmount: 0,
                        receiptNumber: "",
                        receiptDate: "",
                      },
                    }}
                    validationSchema={Yup.object().shape({
                      boothCode: Yup.string().required("Required"),
                      address: Yup.string().required("Required"),
                      phone: Yup.string().required("Required"),
                      contactPersonName: Yup.string().required("Required"),
                      contactPersonTitle: Yup.string().required("Required"),
                      cellPhone1: Yup.string().required("Required"),
                      email: Yup.string().required("Required"),
                      payment: Yup.object().shape({
                        receiptAmount: Yup.number()
                          .required("Required")
                          .min(1)
                          .max(100000),
                        receiptNumber: Yup.string().required("Required"),
                        receiptDate: Yup.date().required("Required"),
                        receiptFile: Yup.mixed().required(),
                      }),
                    })}
                    onSubmit={async (values, actions) => {
                      const companyLogo = await fileToBase64(
                        values.companyLogo
                      );
                      const companyFileName = values.companyLogo.name;
                      const lastIndxOfdot = companyFileName.lastIndexOf(".");
                      const ext = companyFileName.substring(lastIndxOfdot + 1);
                      values.CompanyLogoFileExt = ext;
                      values.companyLogo = companyLogo;

                      const receipt = await fileToBase64(
                        values.payment.receiptFile
                      );
                      values.payment.receiptFileName =
                        values.payment.receiptFile.name;
                      values.payment.receipt = receipt;

                      bookBooth(values);
                    }}
                  >
                    {({
                      values,
                      isSubmitting,
                      setFieldValue,
                      errors,
                      isValid,
                      touched,
                      ...props
                    }) => {
                      return (
                        <Form noValidate className="info_form">
                          <Info
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                            active={activeTabKey == "info"}
                            booths={booths}
                            nextStep={nextStep}
                          />
                          <Details
                            errors={errors}
                            touched={touched}
                            active={activeTabKey == "details"}
                            nextStep={nextStep}
                          />
                          <Payment
                            errors={errors}
                            touched={touched}
                            active={activeTabKey == "payment"}
                          />
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Info = ({ booths, active, nextStep, setFieldValue, ...props }) => {
  const [selectedBooth, setSelectedBooth] = useState(undefined);
  useEffect(() => {
    setSelectedBooth(booths[0]);
  }, [booths]);

  return (
    <div className={classNames("tab_item info_tab", { active })}>
      <div className="labels_area">
        <ul>
          <li className="gold">
            <Trans id="gold_sposer">Gold Sponser</Trans>
          </li>
          <li className="standard">
            <Trans id="standard">Standard</Trans>
          </li>
          <li className="mia">
            <Trans id="mia">MIA</Trans>
          </li>
          <li className="media_industry">
            <Trans id="media_industry">Media Industry</Trans>
          </li>
          {/* <li className="booth_5">Booth type 5</li> */}
        </ul>
      </div>
      <div className="choose_booth">
        <select
          name="boothCode"
          onChange={(e) => {
            const _b = booths.find((a) => a.code == e.target.value);
            setSelectedBooth(_b);
            setFieldValue("boothCode", e.target.value);
          }}
        >
          {booths.map((a) => (
            <option
              key={a.code}
              value={a.code}
              selected={selectedBooth && a.code == selectedBooth.code}
            >
              {a.code}
            </option>
          ))}
        </select>

        {selectedBooth && <span>{selectedBooth.price} USD</span>}
      </div>
      <div className="title">
        <Trans id="area">AREA</Trans>: {selectedBooth && selectedBooth.area}
      </div>
      <LanguageContext.Consumer>
        {({ locale }) => (
          <div className="content">
            {selectedBooth && selectedBooth.description[locale.code]}
          </div>
        )}
      </LanguageContext.Consumer>
      <div className="next_step">
        <button type="button" onClick={nextStep}>
          <Trans id="next">Next</Trans>
        </button>
      </div>
    </div>
  );
};

const Details = ({ active, errors, touched, nextStep, ...props }) => {
  return (
    <div className={classNames("tab_item info_tab", { active })}>
      <div className="choose_booth">
        cellPhone1 cellPhone2 email
        <div className="row">
          <Field
            transId="companyName"
            transdDefaultVal="Company Name"
            hasError={
              errors &&
              errors.companyName !== undefined &&
              touched &&
              touched.companyName !== undefined
            }
            name="companyName"
          />
        </div>
        <div className="row">
          <Field
            transId="nationality"
            transdDefaultVal="Nationality"
            hasError={
              errors &&
              errors.nationality !== undefined &&
              touched &&
              touched.nationality !== undefined
            }
            name="nationality"
          />
        </div>
        <div className="row">
          <Field
            transId="address"
            transdDefaultVal="Address"
            hasError={
              errors &&
              errors.address !== undefined &&
              touched &&
              touched.address !== undefined
            }
            name="address"
          />
        </div>
        <div className="row">
          <Field
            transId="phone"
            transdDefaultVal="Phone number"
            hasError={
              errors &&
              errors.phone !== undefined &&
              touched &&
              touched.phone !== undefined
            }
            name="phone"
          />
        </div>
        <div className="row">
          <Field
            transId="fax"
            transdDefaultVal="Fax"
            hasError={
              errors &&
              errors.fax !== undefined &&
              touched &&
              touched.fax !== undefined
            }
            name="fax"
          />
        </div>
        <div className="row">
          <Field
            transId="websiteUrl"
            transdDefaultVal="Website Url"
            hasError={
              errors &&
              errors.websiteUrl !== undefined &&
              touched &&
              touched.websiteUrl !== undefined
            }
            name="websiteUrl"
          />
        </div>
        <div className="row">
          <Field
            transId="contactPersonName"
            transdDefaultVal="Contact Person"
            hasError={
              errors &&
              errors.contactPersonName !== undefined &&
              touched &&
              touched.contactPersonName !== undefined
            }
            name="contactPersonName"
          />
        </div>
        <div className="row">
          <Field
            transId="contactPersonTitle"
            transdDefaultVal="Contact Person Title"
            hasError={
              errors &&
              errors.contactPersonTitle !== undefined &&
              touched &&
              touched.contactPersonTitle !== undefined
            }
            name="contactPersonTitle"
          />
        </div>
        <div className="row">
          <Field
            transId="cellPhone1"
            transdDefaultVal="Cellphone 1"
            hasError={
              errors &&
              errors.cellPhone1 !== undefined &&
              touched &&
              touched.cellPhone1 !== undefined
            }
            name="cellPhone1"
          />
        </div>
        <div className="row">
          <Field
            transId="cellPhone2"
            transdDefaultVal="Cellphone 2"
            hasError={
              errors &&
              errors.cellPhone2 !== undefined &&
              touched &&
              touched.cellPhone2 !== undefined
            }
            name="cellPhone2"
          />
        </div>
        <div className="row">
          <Field
            transId="email"
            transdDefaultVal="Email"
            hasError={
              errors &&
              errors.email !== undefined &&
              touched &&
              touched.email !== undefined
            }
            name="email"
          />
        </div>
        <div className="row">
          <Field
            transId="company_logo"
            transdDefaultVal="Company Logo"
            isFile={true}
            hasError={
              errors &&
              errors.companyLogo !== undefined &&
              touched &&
              touched.companyLogo !== undefined
            }
            name="companyLogo"
            accept="image/*"
          />
        </div>
      </div>
      <div className="next_step">
        <button type="button" onClick={nextStep}>
          <Trans id="next">Next</Trans>
        </button>
      </div>
    </div>
  );
};

const Payment = ({ active, errors, touched, nextStep, ...props }) => {
  return (
    <div className={classNames("tab_item payment_tab", { active })}>
      <div className="paymnets_area">
        <div className="choose_area">
          <div className="pay_offline_form">
            <p>
              <Trans id="please_upload_the_receipt">
                please upload the reciept to be approved from the adminstration
                and confirm your payment
              </Trans>
            </p>
            <div className="row">
              <Field
                transId="amount"
                transdDefaultVal="Amount"
                hasError={
                  errors &&
                  errors.payment &&
                  errors.payment.receiptAmount !== undefined &&
                  touched &&
                  touched.payment &&
                  touched.payment.receiptAmount !== undefined
                }
                name="payment.receiptAmount"
                type="number"
              />
            </div>
            <div className="row">
              <Field
                transId="receipt_number"
                transdDefaultVal="Receipt Number"
                hasError={
                  errors &&
                  errors.payment &&
                  errors.payment.receiptNumber !== undefined &&
                  touched &&
                  touched.payment &&
                  touched.payment.receiptNumber !== undefined
                }
                name="payment.receiptNumber"
              />
            </div>
            <div className="row">
              <Field
                transId="receipt_date"
                transdDefaultVal="Receipt Date"
                isDate={true}
                hasError={
                  errors &&
                  errors.payment &&
                  errors.payment.receiptDate !== undefined &&
                  touched &&
                  touched.payment &&
                  touched.payment.receiptDate !== undefined
                }
                name="payment.receiptDate"
              />
            </div>
            <div className="row">
              <Field
                transId="receipt_file"
                transdDefaultVal="Receipt File"
                isFile={true}
                hasError={
                  errors &&
                  errors.payment &&
                  errors.payment.receiptFile !== undefined &&
                  touched &&
                  touched.payment &&
                  touched.payment.receiptFile !== undefined
                }
                name="payment.receiptFile"
                accept="image/*"
              />
              <label htmlFor="receipt" className="btn-2">
                <Trans id="choose_receipt_image">Choose receipt image</Trans>
              </label>
              <div className="next_step">
                <button type="submit">
                  <Trans id="book_now">Book Now</Trans>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Confirmation = ({ active, success, ...props }) => {
  return (
    <div className={classNames("tab_item confirmation_tab", { active })}>
      <div className="title">
        <Trans id="booth_booking_success">Booking successfull</Trans>
      </div>
      <div className="content">
        <Trans id="booth_booking_success_msg">
          Thank you please contact us @123456
        </Trans>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { booths, boothBooked } }) => ({
  booths,
  boothBooked,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Booths);
