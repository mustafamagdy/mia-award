import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const UpdateRecordForm = ({ record, onUpdateRecordDetail }) => (
  <Form>
    <FormGroup>
      <Label for="userName">Name</Label>
      <Input
        type="text"
        name="userName"
        id="userName"
        placeholder="Enter Name"
        value={record.name}
        onChange={e => onUpdateRecordDetail("name", e.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label for="userEmail">Email</Label>
      <Input
        type="email"
        name="userEmail"
        id="userEmail"
        placeholder="Enter Email"
        value={record.emailAddress}
        onChange={e => onUpdateRecordDetail("emailAddress", e.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label for="userType">Type</Label>
      <Input
        type="text"
        name="userType"
        id="userType"
        placeholder="Enter Type"
        value={record.type}
        onChange={e => onUpdateRecordDetail("type", e.target.value)}
      />
    </FormGroup>
    <FormGroup>
      <Label for="accountType">Account Type</Label>
      <Input
        type="text"
        name="accountType"
        id="accountType"
        placeholder="Enter Account Type"
        value={record.accountType}
        onChange={e => onUpdateRecordDetail("accountType", e.target.value)}
      />
    </FormGroup>
  </Form>
);

export default UpdateRecordForm;
