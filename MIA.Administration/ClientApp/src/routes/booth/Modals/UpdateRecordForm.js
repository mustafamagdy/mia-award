import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";

const UpdateForm = ({ isOpen, toggleModalOpen, title, record, onSave, resetRecord, ...props }) => {
  const { register, errors, handleSubmit, formState } = useForm({
    defaultValues: { ...record }
  });

  const onSubmit = data => {
    onSave({ ...record, ...data });
    toggleModalOpen();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModalOpen} onClosed={resetRecord}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggleModalOpen}>{`Update ${title}`}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Code</Label>
            <Input innerRef={register({ required: true })} type="text" name="code" placeholder="Booth code" invalid={!!errors.code} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input innerRef={register({ required: true })} type="textarea" name="description" placeholder="Booth description" invalid={!!errors.description} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            {/* <Input innerRef={register({ required: true })} type="text" name="price"
              placeholder="Booth price" invalid={!!errors.price} /> */}

            <Input type="number" inputmode="numeric"
              innerRef={register({ required: true }, { pattern: '\d+((\.|,)\d+)?' })}
              onKeyDown={e => /[\+\-\,]$/.test(e.key) && e.preventDefault()}
              name="price" placeholder="Booth price" invalid={!!errors.price} />


            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" variant="contained" color="primary" className="text-white">
            <Trans id="update">Update</Trans>
          </Button>
          <Button
            variant="contained"
            className="text-white btn-danger"
            type="reset"
            onClick={() => {
              toggleModalOpen();
              resetRecord();
            }}
          >
            <Trans id="cancel">Cancel</Trans>
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
