import React, { FC, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { create } from "zustand";

// dialog store
export interface DialogState {
  intent?: any;
}

export interface DialogAction {
  setIntent: (data: any) => void;
  openDialog: (id: string, intent?: any, join?: boolean) => void;
  closeDialog: (id: string, clear?: boolean) => void;
  clear: () => void;
}

const initialState: DialogState = {
  intent: undefined,
};

const useDialog = create<DialogState & DialogAction>((set, get) => ({
  ...initialState,
  setIntent: (data) => set({ intent: data }),
  openDialog: (id, intent, join) => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    if (dialog) {
      if (intent) {
        if (join) set({ intent: { ...intent, ...get().intent } });
        else set({ intent });
      }
      dialog.showModal();
    }
  },
  closeDialog: (id, clear = true) => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    if (dialog) {
      if (clear) set(initialState);
      dialog.close();
    }
  },
  clear: () => set(initialState),
}));

// dialog view
export interface DialogProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  dontClearOnClose?: boolean;
}

const Dialog: FC<DialogProps> = ({
  id,
  children,
  className,
  title,
  header,
  footer,
  onClose,
  dontClearOnClose = false,
}) => {
  const { clear } = useDialog();

  const close = () => {
    if (!dontClearOnClose) clear();
    if (onClose) onClose();
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <dialog
      id={id}
      onClose={(e) => {
        e.stopPropagation();
        close();
      }}
      className="modal modal-middle"
    >
      <div className={`modal-box !rounded-xl p-0 ${className}`}>
        {/* head  */}
        <div className="sticky top-0 z-10 flex flex-row-reverse flex-wrap items-center gap-2 border-b bg-base-100 p-3">
          <form
            method="dialog"
            onSubmit={() => {
              if (onClose) onClose();
            }}
          >
            <button
              className="btn btn-square btn-ghost btn-xs tooltip tooltip-left flex"
              data-tip="Tutup"
            >
              <RiCloseLine size={16} />
            </button>
          </form>

          {header}

          {title && <p className="font-bold text-sm grow">{title}</p>}
        </div>

        {/* body  */}
        <div className="w-full overflow-x-auto p-6 pt-3">{children}</div>

        {/* footer  */}
        {footer && (
          <div className="flex items-center gap-2 px-3 pb-3">{footer}</div>
        )}
      </div>
    </dialog>
  );
};

export { Dialog, useDialog };
