import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useAlertContext } from "../../context/AlertContext";
import React, { useRef } from "react";
/**
 * This is a global component that uses context to display a global alert message.
 */
function Alert() {
  const componentRef = useRef();
  const { isOpen, type, message, onClose, handleConfirm } = useAlertContext();
  const cancelRef = useRef();
  // const isSuccess = type === "success";

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" fontWeight="bold">
            {type === "success"
              ? "Başarılı!"
              : type === "delete"
              ? "Silme işlemi"
              : type === "continue"
              ? "Emin misiniz?"
              : "Uyarı!"}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              İptal Et
            </Button>
            {type === "delete" && (
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                İçeriği Sil
              </Button>
            )}
            {type === "continue" && (
              <Button colorScheme="blue" onClick={handleConfirm} ml={3}>
                Devam Et
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Alert;

// // <div className="position-absolute top-50 start-50 translate-middle ">
// //   {isOpen && (
// //     <div className="AlertDialog bg-danger color-black p-3 shadow-lg rounded-3">
// //       <div className="display">QWE</div>
// //       <p>
// //         <strong>Submitted!</strong>
// //       </p>
// //       <button className="btn btn-md btn-secondary" onClick={onClose}>
// //         Close
// //       </button>
// //     </div>
// //   )}
// // </div>
