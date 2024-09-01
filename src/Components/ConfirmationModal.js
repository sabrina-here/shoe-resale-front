import React from "react";

function ConfirmationModal({
  modalTitle,
  modalText,
  confirmFunction,
  confirmFunctionParam,
}) {
  return (
    <div>
      <input type="checkbox" id="confirmModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="modal-action">
            <label
              htmlFor="confirmModal"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
          <h3 className="text-lg font-bold">{modalTitle}</h3>
          <p className="py-4">{modalText}</p>
          <div className="modal-action">
            <label
              htmlFor="confirmModal"
              className="btn btn-accent"
              onClick={() => confirmFunction(confirmFunctionParam)}
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
