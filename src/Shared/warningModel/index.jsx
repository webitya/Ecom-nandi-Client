import Modal from "antd/es/modal/Modal"
export const WarningModel = ({ visible, onClose, warningMessage }) => {
    return (
        <>
            <Modal
                open={false}
                onCancel={onClose}
                title="Error"
                footer={null}
            >
                <p>{warningMessage}</p>
            </Modal>
        </>
    )
}