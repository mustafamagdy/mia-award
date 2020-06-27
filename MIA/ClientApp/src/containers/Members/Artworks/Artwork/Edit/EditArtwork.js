import React, { useState, useEffect } from "react";
import { Trans, t } from "@lingui/macro";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Field, LocalizedDataField } from "components/Forms";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import config from "config";

const EditArtworkInfo = ({ artwork, active, editArtwork, ...props }) => {
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
          <Form noValidate className="info_form">
            <div className="pay_col_one">
              <div className="item_top">
                <div className="imgthumb">
                  <img src={artwork?.trophyUrl} alt="Award" />
                </div>
                <div className="desc">
                  <LanguageContext.Consumer>
                    {({ locale }) => (
                      <>
                        <span>
                          <Trans id={artwork?.awardTitle[locale.code]}>
                            {artwork?.awardTitle[locale.code]}
                          </Trans>
                        </span>
                        <p>
                          <Trans id="you_applied_for_award_x">
                            you applied for {artwork?.awardTitle[locale.code]}{" "}
                            award.
                          </Trans>
                        </p>
                      </>
                    )}
                  </LanguageContext.Consumer>
                </div>
              </div>
              {/* <div className="item_bottom">
                <div className="price">
                  {artwork?.awardFee}
                  {currency}
                </div>
              </div> */}
            </div>
            <div className="pay_col_two container-fluid ">
              <div className="">
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
                    transId="description"
                    transdDefaultVal="Description"
                    name="description"
                    errors={errors && errors.description}
                    touched={touched && touched.description}
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
                      errors.productionLicenseNumber !== undefined &&
                      touched &&
                      touched.productionLicenseNumber !== undefined
                    }
                    name="productionLicenseNumber"
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
  );
};

export default EditArtworkInfo;
