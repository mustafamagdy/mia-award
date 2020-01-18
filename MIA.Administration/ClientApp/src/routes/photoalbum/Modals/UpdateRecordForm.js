import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useForm } from "react-hook-form";
import { Trans } from "@lingui/macro";

const UpdateForm = ({ isOpen, toggleModalOpen, title, record, onSave, resetRecord, ...props }) => {
  const { register, errors, handleSubmit, formState } = useForm({
    defaultValues: { ...record }
  });

  const [filesToRemove, setFilesToRemove] = useState([]);
  const [files, setFiles] = useState(record.files);

  const onSubmit = data => {
    const _data = { ...record, ...data, deleteFiles: filesToRemove };
    console.log("ssss ", _data);
    onSave(_data);
    toggleModalOpen();
  };

  const removeFile = fileKey => {
    if (filesToRemove.length > 0) {
      setFilesToRemove([...filesToRemove, fileKey]);
    } else {
      setFilesToRemove([fileKey]);
    }
    console.log(filesToRemove);
    setFiles([...files.filter(a => a.fileKey != fileKey)]);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModalOpen} onClosed={resetRecord}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggleModalOpen}>{`Update ${title}`}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              innerRef={register({ required: true })}
              type="text"
              name="title"
              placeholder="PhotoAlbum title"
              invalid={!!errors.title}
            />
            <FormFeedback>Please enter valid data</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="poster">Album content </Label>
            {files &&
              files.map((f, i) => {
                return (
                  <div key={i}>
                    <img src={f.fileUrl} />
                    <button type="button" onClick={() => removeFile(f.fileKey)}>
                      X
                    </button>
                  </div>
                );
              })}

            <p>Add new items?</p>
            <Input type="file" name="newFiles" innerRef={register} multiple />
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
