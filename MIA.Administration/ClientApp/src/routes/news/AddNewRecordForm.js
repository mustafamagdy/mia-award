import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const AddNewRecordForm = ({ addNewRecordDetails, onChangeAddNewRecordDetails }) => (
    <Form>
        <FormGroup>
            <Label for="userName">Name</Label>
            <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Name"
                value={addNewRecordDetails.name}
                onChange={(e) => onChangeAddNewRecordDetails('name', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Email"
                value={addNewRecordDetails.emailAddress}
                onChange={(e) => onChangeAddNewRecordDetails('emailAddress', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="userType">Type</Label>
            <Input
                type="text"
                name="userType"
                id="userType"
                placeholder="Enter Type"
                value={addNewRecordDetails.type}
                onChange={(e) => onChangeAddNewRecordDetails('type', e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label for="accountType">Account Type</Label>
            <Input
                type="text"
                name="accountType"
                id="accountType"
                placeholder="Enter Account Type"
                value={addNewRecordDetails.accountType}
                onChange={(e) => onChangeAddNewRecordDetails('accountType', e.target.value)}
            />
        </FormGroup>
    </Form>
);

export default AddNewRecordForm;
