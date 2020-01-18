import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";

const AddNewRecordForm = ({ isOpen, toggleModalOpen, title, onSave, ...props }) => {
  const { register, errors, handleSubmit, formState } = useForm({
    defaultValues: {}
  });

  const onSubmit = data => {
    onSave({ ...data });
    toggleModalOpen();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModalOpen}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggleModalOpen}>{`Add new ${title}`}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Code</Label>
            <Input innerRef={register({ required: true })} type="text" name="code" placeholder="Booth code" invalid={!!errors.code} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input innerRef={register({ required: true })} type="textarea" name="description" placeholder="Booth bbody" invalid={!!errors.description} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="title">Price</Label>
            <Input type="number" inputmode="numeric"
              innerRef={register({ required: true }, { pattern: '\d+((\.|,)\d+)?' })}
              onKeyDown={e => /[\+\-\,]$/.test(e.key) && e.preventDefault()}
              name="price" placeholder="Booth price" invalid={!!errors.price} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" variant="contained" className="text-white btn-success">
            <Trans id="update">Save</Trans>
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

export default AddNewRecordForm;
