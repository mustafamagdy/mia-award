/**
 * User Management Page
 */
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { NotificationManager } from "react-notifications";
import Avatar from "@material-ui/core/Avatar";

import api from "Api";
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import AddNewRecordForm from "./AddNewRecordForm";
import UpdateRecordForm from "./UpdateRecordForm";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Trans } from "@lingui/macro";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

export default class NewsList extends Component {
  state = {
    all: false,
    data: null, // initial  data
    selectedItem: null, // selected data to perform operations
    loading: false, // loading activity
    addNewRecordModal: false, // add new data form modal
    addNewRecordDetail: {
      id: "",
      title: ""
    },
    openViewDataDialog: false, // view data dialog box
    editData: null,
    allSelected: false,
    selectedRecords: 0
  };

  componentDidMount() {
    api
      .get("userManagement.js")
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        // error hanlding
      });
  }

  onDelete(data) {
    this.refs.deleteConfirmationDialog.open();
    this.setState({ selectedItem: data });
  }

  deleteRecordPermanently() {
    const { selectedItem } = this.state;
    let data = this.state.data;
    let indexOfDeleteRecord = data.indexOf(selectedItem);
    data.splice(indexOfDeleteRecord, 1);
    this.refs.deleteConfirmationDialog.close();
    this.setState({ loading: true });
    let self = this;
    setTimeout(() => {
      self.setState({ loading: false, data, selectedItem: null });
      NotificationManager.success("Record Deleted!");
    }, 2000);
  }

  opnAddNewRecordModal(e) {
    e.preventDefault();
    this.setState({ addNewRecordModal: true });
  }

  /**
   * On Reload
   */
  onReload(e) {
    e.preventDefault();
    this.setState({ loading: true });
    let self = this;
    setTimeout(() => {
      self.setState({ loading: false });
    }, 2000);
  }

  onSelectRecord(record) {
    record.checked = !record.checked;
    let selectedRecords = 0;
    let data = this.state.data.map(item => {
      if (item.checked) {
        selectedRecords++;
      }
      if (item.id === record.id) {
        if (item.checked) {
          selectedRecords++;
        }
        return record;
      } else {
        return item;
      }
    });
    this.setState({ data, selectedRecords });
  }

  onChangeAddNewRecordDetails(key, value) {
    this.setState({
      addNewRecordDetail: {
        ...this.state.addNewRecordDetail,
        [key]: value
      }
    });
  }

  addNewRecord() {
    const { name, emailAddress } = this.state.addNewRecordDetail;
    if (name !== "" && emailAddress !== "") {
      let data = this.state.data;
      let newRecord = {
        ...this.state.addNewRecordDetail,
        id: new Date().getTime()
      };
      data.push(newRecord);
      this.setState({ addNewRecordModal: false, loading: true });
      let self = this;
      setTimeout(() => {
        self.setState({ loading: false, data });
        NotificationManager.success("Record Created!");
      }, 2000);
    }
  }

  viewRecordDetail(data) {
    this.setState({ openViewDataDialog: true, selectedItem: data });
  }

  onEditRecord(record) {
    console.log("=>edit ", record);
    this.setState({ addNewRecordModal: true, editData: record });
  }

  onAddUpdateRecordModalClose() {
    this.setState({ addNewRecordModal: false, editData: null });
  }

  onUpdateRecordDetails(key, value) {
    this.setState({
      editData: {
        ...this.state.editData,
        [key]: value
      }
    });
  }

  updateRecord() {
    const { editData } = this.state;
    let indexOfUpdateRecord = "";
    let data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      if (record.id === editData.id) {
        indexOfUpdateRecord = i;
      }
    }
    data[indexOfUpdateRecord] = editData;
    this.setState({ loading: true, editData: null, addNewRecordModal: false });
    let self = this;
    setTimeout(() => {
      self.setState({ data, loading: false });
      NotificationManager.success("Record Updated!");
    }, 2000);
  }

  onSelectAllRecord(e) {
    const { selectedRecords, data } = this.state;
    let selectAll = selectedRecords < data.length;
    if (selectAll) {
      let selectAllRecords = data.map(record => {
        record.checked = true;
        return record;
      });
      this.setState({ data: selectAllRecords, selectedRecords: selectAllRecords.length });
    } else {
      let unselectedRecords = data.map(record => {
        record.checked = false;
        return record;
      });
      this.setState({ selectedRecords: 0, data: unselectedRecords });
    }
  }

  render() {
    const { data, loading, selectedItem, editData, allSelected, selectedRecords } = this.state;
    return (
      <div className="user-management">
        <Helmet>
          <title>Reactify | Users Management</title>
          <meta name="description" content="Reactify Widgets" />
        </Helmet>
        <PageTitleBar title={<Trans id="sidebar.userManagement" />} match={this.props.match} />
        <RctCollapsibleCard fullBlock>
          <div className="table-responsive">
            <div className="d-flex justify-content-between py-20 px-10 border-bottom">
              <div>
                <a href="#" onClick={e => this.onReload(e)} className="btn-outline-default mr-10">
                  <i className="ti-reload"></i>
                </a>
                <a href="#" onClick={e => e.preventDefault()} className="btn-outline-default mr-10">
                  More
                </a>
              </div>
              <div>
                <a href="#" onClick={e => e.preventDefault()} className="btn-sm btn-outline-default mr-10">
                  Export to Excel
                </a>
                <a href="#" onClick={e => this.opnAddNewRecordModal(e)} color="primary" className="caret btn-sm mr-10">
                  Add New User <i className="zmdi zmdi-plus"></i>
                </a>
              </div>
            </div>
            <table className="table table-middle table-hover mb-0">
              <thead>
                <tr>
                  <th className="w-5">
                    <FormControlLabel
                      control={
                        <Checkbox
                          indeterminate={selectedRecords > 0 && selectedRecords < data.length}
                          checked={selectedRecords > 0}
                          onChange={e => this.onSelectAllRecord(e)}
                          value="all"
                          color="primary"
                        />
                      }
                      label="All"
                    />
                  </th>
                  <th>User</th>
                  <th>Email Address</th>
                  <th>Status</th>
                  <th>Plans Type</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((record, key) => (
                    <tr key={key}>
                      <td>
                        <FormControlLabel
                          control={<Checkbox checked={record.checked} onChange={() => this.onSelectRecord(record)} color="primary" />}
                        />
                      </td>
                      <td>
                        <div className="media">
                          {record.avatar !== "" ? (
                            <img src={record.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                          ) : (
                            <Avatar className="mr-15">{record.name.charAt(0)}</Avatar>
                          )}
                          <div className="media-body">
                            <h5 className="mb-5 fw-bold">{record.name}</h5>
                            <Badge color="warning">{record.type}</Badge>
                          </div>
                        </div>
                      </td>
                      <td>{record.emailAddress}</td>
                      <td className="d-flex justify-content-start">
                        <span className={`badge badge-xs ${record.badgeClass} mr-10 mt-10 position-relative`}>&nbsp;</span>
                        <div className="status">
                          <span className="d-block">{record.status}</span>
                          <span className="small">{record.lastSeen}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${record.badgeClass} badge-pill`}>{record.accountType}</span>
                      </td>
                      <td>{record.dateCreated}</td>
                      <td className="list-action">
                        {/* <a href="javascript:void(0)" onClick={() => this.viewRecordDetail(user)}><i className="ti-eye"></i></a>
											<a href="javascript:void(0)" onClick={() => this.onEditRecord(user)}><i className="ti-pencil"></i></a>
											<a href="javascript:void(0)" onClick={() => this.onDelete(user)}><i className="ti-close"></i></a> */}
                        <button type="button" className="rct-link-btn" onClick={() => this.viewRecordDetail(record)}>
                          <i className="ti-eye"></i>
                        </button>
                        <button type="button" className="rct-link-btn" onClick={() => this.onEditRecord(record)}>
                          <i className="ti-pencil"></i>
                        </button>
                        <button type="button" className="rct-link-btn" onClick={() => this.onDelete(record)}>
                          <i className="ti-close"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="border-top">
                <tr>
                  <td colSpan="100%">
                    <Pagination className="mb-0 py-10 px-10">
                      <PaginationItem>
                        <PaginationLink previous href="#" onClick={e => e.preventDefault()} />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="#" onClick={e => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" onClick={e => e.preventDefault()}>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" onClick={e => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink next href="#" onClick={e => e.preventDefault()} />
                      </PaginationItem>
                    </Pagination>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {loading && <RctSectionLoader />}
        </RctCollapsibleCard>
        <DeleteConfirmationDialog
          ref="deleteConfirmationDialog"
          title="Are You Sure Want To Delete?"
          message="This will delete user permanently."
          onConfirm={() => this.deleteRecordPermanently()}
        />
        <Modal isOpen={this.state.addNewRecordModal} toggle={() => this.onAddUpdateRecordModalClose()}>
          <ModalHeader toggle={() => this.onAddUpdateRecordModalClose()}>{editData === null ? "Add New User" : "Update User"}</ModalHeader>
          <ModalBody>
            {editData === null ? (
              <AddNewRecordForm
                addNewRecordDetails={this.state.addNewRecordDetail}
                onChangeAddNewRecordDetails={this.onChangeAddNewRecordDetails.bind(this)}
              />
            ) : (
              <UpdateRecordForm record={editData} onUpdateRecordDetail={this.onUpdateRecordDetails.bind(this)} />
            )}
          </ModalBody>
          <ModalFooter>
            {editData === null ? (
              <Button variant="contained" className="text-white btn-success" onClick={() => this.addNewRecord()}>
                Add
              </Button>
            ) : (
              <Button variant="contained" color="primary" className="text-white" onClick={() => this.updateRecord()}>
                Update
              </Button>
            )}{" "}
            <Button variant="contained" className="text-white btn-danger" onClick={() => this.onAddUpdatRecordrModalClose()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Dialog onClose={() => this.setState({ openViewDataDialog: false })} open={this.state.openViewDataDialog}>
          <DialogContent>
            {selectedItem !== null && (
              <div>
                <div className="clearfix d-flex">
                  <div className="media pull-left">
                    <img src={selectedItem.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                    <div className="media-body">
                      <p>
                        Name: <span className="fw-bold">{selectedItem.name}</span>
                      </p>
                      <p>
                        Email: <span className="fw-bold">{selectedItem.emailAddress}</span>
                      </p>
                      <p>
                        Type: <span className="badge badge-warning">{selectedItem.type}</span>
                      </p>
                      <p>
                        Account Type: <span className={`badge ${selectedItem.badgeClass} badge-pill`}>{selectedItem.accountType}</span>
                      </p>
                      <p>Status: {selectedItem.status}</p>
                      <p>Last Seen: {selectedItem.lastSeen}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
