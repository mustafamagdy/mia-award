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

const NewArtwork = ({ awards, addNewArtwork, ...props }) => {
  const [selectedAward, setSelectedAward] = useState();
  useEffect(() => {
    setSelectedAward(awards[0]);
  }, [awards]);

  {
    /* 

choose award type
choose award
enter info
enter payment

submmit

*/
  }
  return (
    <Formik
      initialValues={{
        //award
        awardId: "",
        //artwork
        projectName: { en: "", ar: "" },
        description: { en: "", ar: "" },
        siteUrl: "",
        productionYear: "",
        broadcastYear: "",
        tvChannels: "",
        onlineChannels: "",
        ProductionLicenseNumber: "",
        productionLicenseAgency: "",
        payment: {
          //payment
          receiptAmount: 0,
          receiptNumber: "",
          receiptDate: "",
          receiptFile: undefined,
        },
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
        siteUrl: Yup.string().required("Required"),
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
        payment: Yup.object().shape({
          receiptAmount: Yup.number().required("Required").min(1).max(100000),
          receiptNumber: Yup.string().required("Required"),
          receiptDate: Yup.date().required("Required"),
          receiptFile: Yup.mixed().required(),
          // receiptFile: Yup.mixed()
          //   .test(
          //     "fileSize",
          //     "File Size is too large",
          //     (value) => value.size <= config.MAX_FILE_SIZE
          //   )
          //   .test("fileType", "Unsupported File Format", (value) =>
          //     config.UPLOAD_IMAGE_SUPPORTED_FORMATS.includes(value.type)
          //   ),
        }),
      })}
      onSubmit={async (values, actions) => {
        console.log("submit with values", values);
        debugger;

        const receipt = await fileToBase64(values.payment.receiptFile);
        values.payment.receiptFileName = values.payment.receiptFile.name;
        values.payment.receipt = receipt;

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
          <Form noValidate>
            <div className="pay_col_one">
              <div className="item_top">
                <div className="imgthumb">
                  <img src={selectedAward?.trophyUrl} />
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
                            you applied for {selectedAward?.title[locale.code]}{" "}
                            award please confirm to move on to the payment stage
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
                              setFieldValue("awardId", _award.id);
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
              <div className="item_bottom">
                <div className="price">
                  {selectedAward?.artworkFee}
                  <Trans id="usd">USD</Trans>
                </div>
              </div>
            </div>
            <div className="pay_col_two">
              <div className="grid grid--1 grid--sm-2 grid--md-4 grid--space-def grid--hspace-xl grid--inline">
                <div className="gcell">
                  <LocalizedDataField
                    transId="project_name"
                    transdDefaultVal="Project Name"
                    name="projectName"
                    errors={errors && errors.projectName}
                    touched={touched && touched.projectName}
                  />
                </div>
                <div className="gcell">
                  <LocalizedDataField
                    transId="description"
                    transdDefaultVal="Description"
                    name="description"
                    errors={errors && errors.description}
                    touched={touched && touched.description}
                  />
                </div>
                <div className="gcell">
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
                <div className="gcell">
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

                <div className="gcell">
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

                <div className="gcell">
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

                <div className="gcell">
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
                <div className="gcell">
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
                <div className="gcell">
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
              </div>
            </div>
            <div className="payment_form">
              <p>
                <Trans id="please_upload_payment_receipt">
                  please upload the reciept to be approved from the
                  adminstration and confirm your payment
                </Trans>
              </p>

              <div className="gcell">
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
              <div className="gcell">
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
              <div className="gcell">
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
              <div className="gcell">
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
                />
              </div>
            </div>
            <div>
              <button className="action" type="submit">
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({
  home: { awards },
  members: { artworkDetails },
}) => ({ awards, artworkDetails });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewArtwork);
