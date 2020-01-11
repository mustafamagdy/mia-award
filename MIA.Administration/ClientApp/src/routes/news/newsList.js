import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Paginator from "react-paginate";
import { Trans } from "@lingui/macro";

import lookupActions from "Store/lookups/actions";
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import { AddNewForm, UpdateRecordForm } from "./Modals";
import ViewDialog from "./ViewDialog";

// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";

const NewsList = ({ news, loading, news_metadata, fetchNews, deleteNews, saveNews, updateNews, match }) => {
  const title = "news";
  const [pageNumber, setPageNumber] = useState(news_metadata.pageNumber);
  const [pageSize, setPageSize] = useState(news_metadata.pageSize);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [editDlgOpen, setEditDlgOpen] = useState(false);
  const [newDlgOpen, setNewDlgOpen] = useState(false);
  const [viewDlgIsOpen, setViewDlgIsOpen] = useState(false);
  const deleteConfirmationDialog = useRef(null);

  useEffect(() => {
    fetchNews({ pageNumber, pageSize });
  }, [pageNumber, pageSize]);

  const confirmDelete = record => {
    deleteConfirmationDialog.current.open();
    setSelectedItem(record);
  };

  const deleteRecord = () => {
    deleteNews(selectedItem.id);
    deleteConfirmationDialog.current.close();
    setSelectedItem(null);
  };

  const onReload = e => {
    e.preventDefault();
    fetchNews({ pageNumber, pageSize });
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
              <a href="#" onClick={() => setNewDlgOpen(true)} color="primary" className="caret btn-sm mr-10">
                <Trans id="add_new">Add New</Trans> {title} <i className="zmdi zmdi-plus"></i>
              </a>
            </div>
          </div>
          <table className="table table-middle table-hover mb-0">
            <thead>
              <tr>
                <th>
                  <Trans id="title"> Title</Trans>
                </th>
                <th>
                  <Trans id="date"> Date Created</Trans>
                </th>
                <th>
                  <Trans id="outdated"> Outdated</Trans>
                </th>
                <th>
                  <Trans id="action"> Action</Trans>
                </th>
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
                  <Paginator pageRangeDisplayed={4} pageCount={news_metadata.pageCount} onPageChange={p => setPageNumber(p.selected + 1)} />
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
          onSave={updateNews}
          toggleModalOpen={() => setEditDlgOpen(false)}
          title={title}
          record={selectedItem}
          resetRecord={resetSelectedRecord}
        />
      )}
      <AddNewForm isOpen={newDlgOpen} onSave={saveNews} toggleModalOpen={() => setNewDlgOpen(false)} title={title} />
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

const mapStateToProps = ({ lookups: { news, loading, news_metadata } }) => ({ news, loading, news_metadata });
const mapDispatchToProps = dispatch => bindActionCreators({ ...lookupActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewsList);

