/** @format */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface IAlertContext {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: () => void;
  setOnConfirm: React.Dispatch<React.SetStateAction<() => void>>;
  isButtonOpen: boolean;
  setIsButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertContext = createContext<IAlertContext>({
  dialogOpen: false,
  setDialogOpen: () => {},
  content: "",
  setContent: () => {},
  onConfirm: () => {},
  setOnConfirm: () => {},
  isButtonOpen: false,
  setIsButtonOpen: () => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [content, setContent] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {}); // 增加 onConfirm 的 state
  const [isButtonOpen, setIsButtonOpen] = useState(false);

  return (
    <AlertContext.Provider
      value={{
        dialogOpen,
        setDialogOpen,
        content,
        setContent,
        onConfirm,
        setOnConfirm,
        isButtonOpen,
        setIsButtonOpen,
      }}
    >
      {children}
      <AlertComponent />
    </AlertContext.Provider>
  );
};

const AlertComponent = () => {
  const {
    dialogOpen,
    content,
    onConfirm,
    setDialogOpen,
    setOnConfirm,
    isButtonOpen,
    setIsButtonOpen,
  } = useContext(AlertContext);

  const handleClose = () => {
    setDialogOpen(false);
    setOnConfirm(() => {}); // 清空 onConfirm
    setIsButtonOpen(false);
  };

  const resolvePromise = (onConfirm: () => void) => {
    return new Promise((resolve, reject) => {
      resolve(onConfirm());
      reject(new Error("系統錯誤，請回報開發人員"));
    });
  };

  const handleConfirmClick = () => {
    resolvePromise(onConfirm)
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "444px",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#D32F2F",
          color: "white",
          padding: "5px 15px",
          fontSize: "1rem",
        }}
      >
        {"提醒"}
      </DialogTitle>
      <DialogContent style={{ padding: "20px 10px 5px 10px" }}>
        <DialogContentText
          style={{
            color: "black",
            fontSize: "1rem",
            padding: "5px 10px",
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isButtonOpen && (
          <Button
            onClick={handleConfirmClick}
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            確認
          </Button>
        )}
        <Button onClick={handleClose} sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};
