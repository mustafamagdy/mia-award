import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const renderViewDialog = ({ record, isOpen, onClose }) => {
  return !!record ? (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogContent>
        <div>
          <div className="clearfix d-flex">
            <div className="media pull-left">
              {/* <img src={record.avatar} alt="user prof" className="rounded-circle mr-15" width="50" height="50" /> */}
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
      </DialogContent>
    </Dialog>
  ) : null;
};

export default renderViewDialog;
