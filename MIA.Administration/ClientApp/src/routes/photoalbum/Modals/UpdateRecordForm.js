import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";

const UpdateForm = ({ isOpen, toggleModalOpen, title, record, onSave, resetRecord, ...props }) => {
  const { register, errors, handleSubmit, formState } = useForm({
    defaultValues: { ...record }
  });

  const onSubmit = data => {
    onSave({ ...record, ...data, poster: data.poster[0] });
    toggleModalOpen();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModalOpen} onClosed={resetRecord}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggleModalOpen}>{`Update ${title}`}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input innerRef={register({ required: true })} type="text" name="title" placeholder="PhotoAlbum title" invalid={!!errors.title} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="body">Body</Label>
            <Input innerRef={register({ required: true })} type="textarea" name="body" placeholder="PhotoAlbum bbody" invalid={!!errors.body} />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="poster">Poster</Label>
            <Input innerRef={register({ required: true })} type="file" name="poster" invalid={!!errors.body} />
            <FormFeedback>Please choose poster image</FormFeedback>
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
