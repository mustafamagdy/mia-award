import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Paginator from "react-paginate";
import { Trans } from "@lingui/macro";

import votingcriteriaActions from "Store/votingcriteria/actions";
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { AddRecordForm, UpdateRecordForm } from "./Modals";
import ViewDialog from "./ViewDialog";

// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";

const VotingCriteriaList = ({ votingcriteriaList, loading, votingcriteria_metadata, fetchVotingCriterias, deleteVotingCriteria, saveVotingCriteria, updateVotingCriteria, match }) => {
  const title = "votingcriteria";
  const [pageNumber, setPageNumber] = useState(votingcriteria_metadata.pageNumber);
  const [pageSize, setPageSize] = useState(votingcriteria_metadata.pageSize);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [editDlgOpen, setEditDlgOpen] = useState(false);
  const [newDlgOpen, setNewDlgOpen] = useState(false);
  const [viewDlgIsOpen, setViewDlgIsOpen] = useState(false);
  const deleteConfirmationDialog = useRef(null);

  useEffect(() => {
    debugger;
    fetchVotingCriterias({ pageNumber, pageSize });
  }, [pageNumber, pageSize]);

  const confirmDelete = record => {
    deleteConfirmationDialog.current.open();
    setSelectedItem(record);
  };

  const deleteRecord = () => {
    deleteVotingCriteria(selectedItem.id);
    deleteConfirmationDialog.current.close();
    setSelectedItem(null);
  };

  const onReload = e => {
    e.preventDefault();
    fetchVotingCriterias({ pageNumber, pageSize });
  };

  const viewRecordDetail = data => {
    setSelectedItem(data);
    setViewDlgIsOpen(true);
  };

  const onEditRecord = record => {
    setSelectedItem(record);
    setEditDlgOpen(true);
  };

  const resetSelectedRecord = () => {
    setSelectedItem(null);
  };

  return (
    <div className="user-management">
      <Helmet>
        <title>MIA | {title}</title>
        <meta name="description" content="Reactify Widgets" />
      </Helmet>
      <PageTitleBar title={<Trans id="sidebar.votingcriteria" />} match={match} />
      <RctCollapsibleCard fullBlock>
        <div className="table-responsive">
          <div className="d-flex justify-content-between py-20 px-10 border-bottom">
            <div>
              <a href="#" onClick={e => onReload(e)} className="btn-outline-default mr-10">
                <i className="ti-reload"></i>
              </a>
            </div>
            <div>
              <a href="#" onClick={() => setNewDlgOpen(true)} color="primary" className="caret btn-sm mr-10">
                <Trans id="add_new">Add New</Trans> {title} <i className="zmdi zmdi-plus"></i>
              </a>
            </div>
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th>
                  <Trans id="title"> Code</Trans>
                </th>
                <th>
                  <Trans id="date"> Name</Trans>
                </th>
                <th>
                  <Trans id="outdated"> Weight</Trans>
                </th>
                <th>
                  <Trans id="action"> Action</Trans>
                </th>
              </tr>
            </thead>
            <tbody>
              {votingcriteriaList &&
                votingcriteriaList.map((record, key) => (

                  <tr key={key}>
                    <td>{record.code}</td>
                    <td>{record.name}</td>
                    <td>{record.weight}</td>
                    <td className="list-action">
                      <button type="button" className="rct-link-btn" onClick={() => viewRecordDetail(record)}>
                        <i className="ti-eye"></i>
                      </button>
                      <button type="button" className="rct-link-btn" onClick={() => onEditRecord(record)}>
                        <i className="ti-pencil"></i>
                      </button>
                      <button type="button" className="rct-link-btn" onClick={() => confirmDelete(record)}>
                        <i className="ti-close"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot className="border-top">
              <tr>
                <td colSpan="100%">
                  <Paginator pageRangeDisplayed={4} pageCount={votingcriteria_metadata.pageCount} onPageChange={p => setPageNumber(p.selected + 1)} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {loading && <RctSectionLoader />}
      </RctCollapsibleCard>
      <DeleteConfirmationDialog
        ref={deleteConfirmationDialog}
        title="Are You Sure Want To Delete?"
        message={`This will delete ${title} permanently.`}
        onConfirm={() => deleteRecord()}
        onClose={resetSelectedRecord}
      />
      {selectedItem && (
        <UpdateRecordForm
          isOpen={editDlgOpen}
          onSave={updateVotingCriteria}
          toggleModalOpen={() => setEditDlgOpen(false)}
          title={title}
          record={selectedItem}
          resetRecord={resetSelectedRecord}
        />
      )}
      <AddRecordForm isOpen={newDlgOpen} onSave={saveVotingCriteria} toggleModalOpen={() => setNewDlgOpen(false)} title={title} />
      <ViewDialog
        record={selectedItem}
        isOpen={viewDlgIsOpen}
        onClose={() => {
          setViewDlgIsOpen(false);
          resetSelectedRecord();
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ votingcriterias: { votingcriteriaList, loading, votingcriteria_metadata } }) => ({ votingcriteriaList, loading, votingcriteria_metadata });
const mapDispatchToProps = dispatch => bindActionCreators({ ...votingcriteriaActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VotingCriteriaList);

