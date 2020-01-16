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
                  Title: <span className="fw-bold">{record.Description}</span>
                </p>
                <p>
                  Body: <span className="fw-bold">{record.Code}</span>
                </p>
                <p>{record.Price}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default renderViewDialog;
