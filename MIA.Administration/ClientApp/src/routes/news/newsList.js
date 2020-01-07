/**
 * User Management Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { NotificationManager } from "react-notifications";

import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import AddNewRecordForm from "./AddNewRecordForm";
import UpdateRecordForm from "./UpdateRecordForm";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Trans } from "@lingui/macro";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { connect } from "react-redux";
import lookupActions from "Store/lookups/actions";
import { bindActionCreators } from "redux";


const NewsList = ({ news, loading, fetchNews, deleteNews, match }) => {
  const title = "news";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [addNewRecordModal, setAddNewRecordModal] = useState(false);
  const [openViewDataDialog, setOpenViewDataDialog] = useState(false);

  useEffect(() => {
    fetchNews({ pageNumber, pageSize });
  }, [pageNumber, pageSize]);

  const componentDidMount = () => {};

  const onDelete = record => {
    refs.deleteConfirmationDialog.open();
    setSelectedItem(record);
  };

  const deleteRecordPermanently = () => {
    deleteNews(selectedItem.id);
  };

  const opnAddNewRecordModal = e => {
    e.preventDefault();
    setAddNewRecordModal(true);
  };

  const onReload = e => {
    e.preventDefault();
    fetchNews({ pageNumber, pageSize });
  };

  const onChangeAddNewRecordDetails = (key, value) => {
    // setState({
    //   addNewRecordDetail: {
    //     ...state.addNewRecordDetail,
    //     [key]: value
    //   }
    // });
  };

  const addNewRecord = () => {
    // const { name, emailAddress } = state.addNewRecordDetail;
    // if (name !== "" && emailAddress !== "") {
    //   let data = state.data;
    //   let newRecord = {
    //     ...state.addNewRecordDetail,
    //     id: new Date().getTime()
    //   };
    //   data.push(newRecord);
    //   setState({ addNewRecordModal: false, loading: true });
    //   let self = this;
    //   setTimeout(() => {
    //     self.setState({ loading: false, data });
    //     NotificationManager.success("Record Created!");
    //   }, 2000);
    // }
  };

  const viewRecordDetail = data => {
    setSelectedItem(record);
    setOpenViewDataDialog(true);
  };

  const onEditRecord = record => {
    setSelectedItem(record);
    setAddNewRecordModal(true);
  };

  const onAddUpdateRecordModalClose = () => {
    setAddNewRecordModal(false);
    setSelectedItem(null);
  };

  const onUpdateRecordDetails = (key, value) => {
    // setState({
    //   editData: {
    //     ...state.editData,
    //     [key]: value
    //   }
    // });
  };

  const updateRecord = () => {
    // const { editData } = state;
    // let indexOfUpdateRecord = "";
    // let data = state.data;
    // for (let i = 0; i < data.length; i++) {
    //   const record = data[i];
    //   if (record.id === editData.id) {
    //     indexOfUpdateRecord = i;
    //   }
    // }
    // data[indexOfUpdateRecord] = editData;
    // setState({ loading: true, editData: null, addNewRecordModal: false });
    // let self = this;
    // setTimeout(() => {
    //   self.setState({ data, loading: false });
    //   NotificationManager.success("Record Updated!");
    // }, 2000);
  };

  const renderPager = () => {
    return (
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
    );
  };

  const renderViewDialog = record => {
    return (
      <Dialog onClose={() => setState({ openViewDataDialog: false })} open={state.openViewDataDialog}>
        <DialogContent>
          {record !== null && (
            <div>
              <div className="clearfix d-flex">
                <div className="media pull-left">
                  <img src={record.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                  <div className="media-body">
                    <p>
                      Title: <span className="fw-bold">{record.title}</span>
                    </p>
                    <p>
                      Body: <span className="fw-bold">{record.body}</span>
                    </p>
                    <p>{record.imageUrl}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  // if (deleted) {
  //   refs.deleteConfirmationDialog.close();
  //   NotificationManager.success("Record Deleted!");
  // }

  return (
    <div className="user-management">
      <Helmet>
        <title>MIA | {title}</title>
        <meta name="description" content="Reactify Widgets" />
      </Helmet>
      <PageTitleBar title={<Trans id="sidebar.userManagement" />} match={match} />
      <RctCollapsibleCard fullBlock>
        <div className="table-responsive">
          <div className="d-flex justify-content-between py-20 px-10 border-bottom">
            <div>
              <a href="#" onClick={e => onReload(e)} className="btn-outline-default mr-10">
                <i className="ti-reload"></i>
              </a>
            </div>
            <div>
              <a href="#" onClick={e => opnAddNewRecordModal(e)} color="primary" className="caret btn-sm mr-10">
                Add New {title} <i className="zmdi zmdi-plus"></i>
              </a>
            </div>
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date Created</th>
                <th>Outdated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {news &&
                news.map((record, key) => (
                  <tr key={key}>
                    <td>{record.title}</td>
                    <td>{record.dateCreated}</td>
                    <td>{record.outDated ? "Yes" : "No"}</td>
                    <td className="list-action">
                      <button type="button" className="rct-link-btn" onClick={() => viewRecordDetail(record)}>
                        <i className="ti-eye"></i>
                      </button>
                      <button type="button" className="rct-link-btn" onClick={() => onEditRecord(record)}>
                        <i className="ti-pencil"></i>
                      </button>
                      <button type="button" className="rct-link-btn" onClick={() => onDelete(record)}>
                        <i className="ti-close"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot className="border-top">
              <tr>
                <td colSpan="100%">{renderPager()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>
      <DeleteConfirmationDialog
        ref="deleteConfirmationDialog"
        title="Are You Sure Want To Delete?"
        message={`This will delete ${title} permanently.`}
        onConfirm={() => deleteRecordPermanently()}
      />
      <Modal isOpen={state.addNewRecordModal} toggle={() => onAddUpdateRecordModalClose()}>
        <ModalHeader toggle={() => onAddUpdateRecordModalClose()}>{editData === null ? `Add New ${title}` : `Update ${title}`}</ModalHeader>
        <ModalBody>
          {editData === null ? (
            <AddNewRecordForm
              addNewRecordDetails={state.addNewRecordDetail}
              onChangeAddNewRecordDetails={onChangeAddNewRecordDetails.bind(this)}
            />
          ) : (
            <UpdateRecordForm record={editData} onUpdateRecordDetail={onUpdateRecordDetails.bind(this)} />
          )}
        </ModalBody>
        <ModalFooter>
          {editData === null ? (
            <Button variant="contained" className="text-white btn-success" onClick={() => addNewRecord()}>
              Add
            </Button>
          ) : (
            <Button variant="contained" color="primary" className="text-white" onClick={() => updateRecord()}>
              Update
            </Button>
          )}{" "}
          <Button variant="contained" className="text-white btn-danger" onClick={() => onAddUpdatRecordrModalClose()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {renderViewDialog()}
    </div>
  );
};

const mapStateToProps = ({ lookups: { news, loading, deleted, updated } }) => ({ news, loading });
const mapDispatchToProps = dispatch => bindActionCreators({ ...lookupActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
