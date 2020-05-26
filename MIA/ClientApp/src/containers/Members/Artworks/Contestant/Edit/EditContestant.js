import React, { useState, useEffect } from "react";
import { Trans, t } from "@lingui/macro";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Field, LocalizedDataField } from "components/Forms";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import config from "config";

const EditContestantInfo = ({ artwork, active, editArtwork, ...props }) => {
  return (
    <Formik
      initialValues={artwork}
      validationSchema={Yup.object().shape({
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
        productionLicenseNumber: Yup.string().required("Required"),
        productionLicenseAgency: Yup.string().required("Required"),
      })}
      onSubmit={async (values, actions) => {
        debugger;
        editArtwork(values);
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
                  <img src={artwork?.award?.trophyUrl} alt="Award" />
                </div>
                <div className="desc">
                  <LanguageContext.Consumer>
                    {({ locale }) => (
                      <>
                        <span>
                          <Trans id={artwork?.award?.title[locale.code]}>
                            {artwork?.award?.title[locale.code]}
                          </Trans>
                        </span>
                        <p>
                          <Trans id="you_applied_for_award_x">
                            you applied for {artwork?.award?.title[locale.code]}{" "}
                            award please confirm to move on to the payment stage
                          </Trans>
                        </p>
                      </>
                    )}
                  </LanguageContext.Consumer>
                </div>
              </div>
              <div className="item_bottom">
                <div className="price">
                  {artwork?.award?.artworkFee}
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
                      errors.productionLicenseNumber !== undefined &&
                      touched &&
                      touched.productionLicenseNumber !== undefined
                    }
                    name="productionLicenseNumber"
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
            <div>
              <button className="action" type="submit">
                <Trans id="save">Save</Trans>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditContestantInfo;
