import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Field, LocalizedDataField } from "components/Forms";
import * as Yup from "yup";
import config from "config";
import { useParams, useLocation } from "react-router";

const ArtworkData = ({ location, details, ...props }) => {
  const { id } = useParams();

  const validationSchema = Yup.object().shape({});

  return (
    <Formik
      initialValues={{
        projectName: details?.projectName,
        description: details?.description,
        siteUrl: details?.siteUrl,
        productionYear: details?.productionYear,
        broadcastYear: details?.broadcastYear,
        tvChannels: details?.tvChannels,
        onlineChannels: details?.onlineChannels,
        ProductionLicenseNumber: details?.ProductionLicenseNumber,
        productionLicenseAgency: details?.productionLicenseAgency,
      }}
      // ref={(r) => setFormRef(r)}
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
        ProductionLicenseNumber: Yup.string().required("Required"),
        productionLicenseAgency: Yup.string().required("Required"),
      })}
      onSubmit={(values, actions) => {
        console.log("submit with values", values);
        // submitForm && submitForm(values);
      }}
      render={({
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

              <button className="action" type="submit">
                Save
              </button>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default ArtworkData;
