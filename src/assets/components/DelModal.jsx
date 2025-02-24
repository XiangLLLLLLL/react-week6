import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { pushMessage } from "../slice/toastSlice";

const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

function DelModal({ getData, tempProduct, isDelModalOpen, setIsDelModalOpen }) {
  // 刪除modal
  const delproductModalRef = useRef(null);
  useEffect(() => {
    if (isDelModalOpen) {
      const modalInstance = Modal.getInstance(delproductModalRef.current);
      modalInstance.show();
    }
  }, [isDelModalOpen]);

  useEffect(() => {
    new Modal(delproductModalRef.current, {
      backdrop: false,
    });
  }, []);

  const handleCloseDelProductModal = () => {
    const modalInstance = Modal.getInstance(delproductModalRef.current);
    modalInstance.hide();
    setIsDelModalOpen(false);
  };

  const dispatch = useDispatch();
  const delProduct = async () => {
    try {
      const response = await axios.delete(`${apiBase}/v2/api/${apiPath}/admin/product/${tempProduct.id}`);
      dispatch(pushMessage({ success: response.data.success, text: response.data.message }));
      getData();

      handleCloseDelProductModal();
    } catch (error) {
      const { success, message } = error.response.data;
      dispatch(
        pushMessage({
          success,
          text: Array.isArray(message)
            ? message.map((item, index) => {
                return (
                  <span key={index}>
                    {item}！
                    <br />
                  </span>
                );
              })
            : message,
        })
      );
    }
  };

  const handleDelProduct = () => {
    delProduct();
  };

  return (
    <div ref={delproductModalRef} className="modal fade" id="delProductModal" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button onClick={handleCloseDelProductModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button onClick={handleCloseDelProductModal} type="button" className="btn btn-secondary">
              取消
            </button>
            <button onClick={handleDelProduct} type="button" className="btn btn-danger">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelModal;
