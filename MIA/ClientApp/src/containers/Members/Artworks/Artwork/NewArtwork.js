import React, { useState } from "react";
import classNames from "classnames";
import { Trans, t } from "@lingui/macro";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Field, LocalizedDataField } from "components/Forms";
import { I18n } from "@lingui/react";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import config from "config";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { fileToBase64 } from "utils";
import LocalizedDropdown from "../../../../components/Forms/LocalizedDropdown";

const NewArtwork = ({ awards, addNewArtwork, genres, ...props }) => {
  const [selectedAward, setSelectedAward] = useState();
  useEffect(() => {
    setSelectedAward(awards[0]);
  }, [awards]);

  return (
    <React.Fragment>
      <div
        className="upload_poster"
        style={{
          background:
            "transparent url('/assets/images/poaster.png') scroll no-repeat top center/cover",
        }}
      ></div>
      <Formik
        initialValues={{
          //award
          awardId: "",
          //artwork
          projectName: { en: "", ar: "" },
          description: { en: "", ar: "" },
          siteUrl: "",
          genre: "",
          productionYear: "",
          broadcastYear: "",
          tvChannels: "",
          onlineChannels: "",
          ProductionLicenseNumber: "",
          productionLicenseAgency: "",
          file1: undefined,
          file2: undefined,
          file3: undefined,
          resume: undefined,

          // payment: {
          //   //payment
          //   receiptAmount: 0,
          //   receiptNumber: "",
          //   receiptDate: "",
          //   receiptFile: undefined,
          // },
        }}
        // ref={(r) => setFormRef(r)}
        validationSchema={Yup.object().shape({
          awardId: Yup.string().required("Required"),
          projectName: Yup.object().shape({
            ar: Yup.string().required("Required"),
            en: Yup.string().required("Required"),
          }),
          description: Yup.object().shape({
            ar: Yup.string().required("Required"),
            en: Yup.string().required("Required"),
          }),
          siteUrl: Yup.string()
            .required("Required")
            .matches(config.validationRules.url, "not_valid_url"),
          genre: Yup.string().required("Required"),
          productionYear: Yup.number()
            .required("Required")
            .min(config.validationRules.allowed_artwork_years.min)
            .max(config.validationRules.allowed_artwork_years.max),
          broadcastYear: Yup.number()
            .required("Required")
            .min(config.validationRules.allowed_artwork_years.min)
            .max(config.validationRules.allowed_artwork_years.max),
          tvChannels: Yup.string().required("Required"),
          onlineChannels: Yup.string().required("Required"),
          ProductionLicenseNumber: Yup.string().required("Required"),
          productionLicenseAgency: Yup.string().required("Required"),
          file1: Yup.mixed().required("File_is_required"),
          file2: Yup.mixed().required("File_is_required"),
          file3: Yup.mixed().required("File_is_required"),
          // resume: Yup.mixed().required(),

          // payment: Yup.object().shape({
          //   receiptAmount: Yup.number().required("Required").min(1).max(100000),
          //   receiptNumber: Yup.string().required("Required"),
          //   receiptDate: Yup.date().required("Required"),
          //   receiptFile: Yup.mixed().required(),
          //   // receiptFile: Yup.mixed()
          //   //   .test(
          //   //     "fileSize",
          //   //     "File Size is too large",
          //   //     (value) => value.size <= config.MAX_FILE_SIZE
          //   //   )
          //   //   .test("fileType", "Unsupported File Format", (value) =>
          //   //     config.UPLOAD_IMAGE_SUPPORTED_FORMATS.includes(value.type)
          //   //   ),
          // }),
        })}
        onSubmit={async (values, actions) => {
          // const receipt = await fileToBase64(values.payment.receiptFile);
          // values.payment.receiptFileName = values.payment.receiptFile.name;
          // values.payment.receipt = receipt;

          const file1 = await fileToBase64(values.file1);
          values.file1FileName = values.file1.name;
          values.file1 = file1;

          const file2 = await fileToBase64(values.file2);
          values.file2FileName = values.file2.name;
          values.file2 = file2;

          const file3 = await fileToBase64(values.file3);
          values.file3FileName = values.file3.name;
          values.file3 = file3;

          addNewArtwork(values);
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
              <div className="pay_col_one">
                <div className="item_top">
                  <div className="imgthumb">
                    {selectedAward && selectedAward.id != "0" && (
                      <img src={selectedAward?.trophyUrl} alt="Trophy" />
                    )}
                  </div>
                  <div className="desc">
                    <LanguageContext.Consumer>
                      {({ locale }) => (
                        <>
                          <span>
                            <Trans id={selectedAward?.title[locale.code]}>
                              {selectedAward?.title[locale.code]}
                            </Trans>
                          </span>
                          <p>
                            <Trans id="you_applied_for_award_x">
                              you applied for{" "}
                              {selectedAward?.title[locale.code]} award.
                            </Trans>
                          </p>

                          <div className="award_category">
                            <select
                              name="awardId"
                              onChange={(a) => {
                                const _award = awards.find(
                                  (x) => x.id == a.target.value
                                );
                                setSelectedAward(_award);
                                if (_award.id == "0") {
                                  setFieldValue("awardId", undefined);
                                } else {
                                  setFieldValue("awardId", _award.id);
                                }
                              }}
                            >
                              <I18n>
                                {({ i18n }) => {
                                  return awards.map((a, i) => (
                                    <option key={a.id} value={a.id}>
                                      {i18n._(a.code)}
                                    </option>
                                  ));
                                }}
                              </I18n>
                            </select>
                          </div>
                        </>
                      )}
                    </LanguageContext.Consumer>
                  </div>
                </div>
                {/* {selectedAward && selectedAward.id != "0" && (
                  <div className="item_bottom">
                    <div className="price">
                      {selectedAward?.artworkFee}
                      <Trans id="usd">USD</Trans>
                    </div>
                  </div>
                )} */}
              </div>
              <div className="pay_col_two">
                <div className="grid grid--1 grid--sm-2 grid--md-4 grid--space-def grid--hspace-xl grid--inline">
                  <div className="row">
                    <LocalizedDataField
                      transId="project_name"
                      transdDefaultVal="Project Name"
                      name="projectName"
                      errors={errors && errors.projectName}
                      touched={touched && touched.projectName}
                    />
                  </div>
                  <div className="row">
                    <LocalizedDataField
                      isTextArea={true}
                      transId="description"
                      transdDefaultVal="Description"
                      name="description"
                      errors={errors && errors.description}
                      touched={touched && touched.description}
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="genre"
                      transdDefaultVal="Genre"
                      hasError={
                        errors &&
                        errors.genre !== undefined &&
                        touched &&
                        touched.genre !== undefined
                      }
                      name="genre"
                      component={LocalizedDropdown}
                      options={genres}
                      labelProp="name"
                      valueProp="id"
                      emptyValue={{ en: "Select Genre", ar: "اخر نوع المشروع" }}
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="site_url"
                      transdDefaultVal="Site Url"
                      hasError={
                        errors &&
                        errors.siteUrl !== undefined &&
                        touched &&
                        touched.siteUrl !== undefined
                      }
                      name="siteUrl"
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="production_year"
                      transdDefaultVal="Production Year"
                      hasError={
                        errors &&
                        errors.productionYear !== undefined &&
                        touched &&
                        touched.productionYear !== undefined
                      }
                      name="productionYear"
                    />
                  </div>

                  <div className="row">
                    <Field
                      transId="broadcast_year"
                      transdDefaultVal="Broadcast Year"
                      hasError={
                        errors &&
                        errors.broadcastYear !== undefined &&
                        touched &&
                        touched.broadcastYear !== undefined
                      }
                      name="broadcastYear"
                    />
                  </div>

                  <div className="row">
                    <Field
                      transId="tv_channels"
                      transdDefaultVal="Tv Channels"
                      hasError={
                        errors &&
                        errors.tvChannels !== undefined &&
                        touched &&
                        touched.tvChannels !== undefined
                      }
                      name="tvChannels"
                    />
                  </div>

                  <div className="row">
                    <Field
                      transId="online_channels"
                      transdDefaultVal="Online Channels"
                      hasError={
                        errors &&
                        errors.onlineChannels !== undefined &&
                        touched &&
                        touched.onlineChannels !== undefined
                      }
                      name="onlineChannels"
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="production_license_number"
                      transdDefaultVal="Production License Number"
                      hasError={
                        errors &&
                        errors.ProductionLicenseNumber !== undefined &&
                        touched &&
                        touched.ProductionLicenseNumber !== undefined
                      }
                      name="ProductionLicenseNumber"
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="production_license_agency"
                      transdDefaultVal="Production License Agency"
                      hasError={
                        errors &&
                        errors.productionLicenseAgency !== undefined &&
                        touched &&
                        touched.productionLicenseAgency !== undefined
                      }
                      name="productionLicenseAgency"
                    />
                  </div>
                  {selectedAward && selectedAward.awardType == "person" && (
                    <div className="row">
                      <Field
                        transId="resume"
                        transdDefaultVal="Resume"
                        isFile={true}
                        hasError={
                          errors &&
                          errors.resume !== undefined &&
                          touched &&
                          touched.resume !== undefined
                        }
                        name="resume"
                        accept="image/*"
                      />
                    </div>
                  )}
                  <div className="row">
                    <Field
                      transId="file1"
                      transdDefaultVal="File 1"
                      isFile={true}
                      hasError={
                        errors &&
                        errors.file1 !== undefined &&
                        touched &&
                        touched.file1 !== undefined
                      }
                      name="file1"
                      accept="image/*"
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="file2"
                      transdDefaultVal="File 2"
                      isFile={true}
                      hasError={
                        errors &&
                        errors.file2 !== undefined &&
                        touched &&
                        touched.file2 !== undefined
                      }
                      name="file2"
                      accept="image/*"
                    />
                  </div>
                  <div className="row">
                    <Field
                      transId="file3"
                      transdDefaultVal="File 3"
                      isFile={true}
                      hasError={
                        errors &&
                        errors.file3 !== undefined &&
                        touched &&
                        touched.file3 !== undefined
                      }
                      name="file3"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="payment_form">
                  {/* <p className="info">
                    <Trans id="please_upload_payment_receipt">
                      please upload the reciept to be approved from the
                      adminstration and confirm your payment
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
                  </div>
                  */}
                  <div className="row">
                    <button className="normal_button" type="submit">
                      <Trans id="save">Save</Trans>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

const mapStateToProps = ({ home: { awards, genres, artworkSubjectRoles } }) => {
  const _awards = awards.filter((a) => a.awardType == "artwork");
  _awards.unshift({
    id: "0",
    code: "choose_award",
    title: {
      ar: "اختر الجائزة",
      en: "Select Award",
    },
  });

  return {
    awards: _awards,
    genres,
    artworkSubjectRoles,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewArtwork);
