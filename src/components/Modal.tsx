import React from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div
                        className="fixed inset-0 bg-black opacity-40"
                        onClick={handleOverlayClick}
                    ></div>
                    <div className="relative w-full max-w-md mx-auto mt-10">
                        <div
                            className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">{title}</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={onClose}
                                >
                                    <span
                                        className="text-red-600 h-6 w-6 text-2xl block outline-none focus:outline-none hover:text-red-400 transition-all duration-300 hover:scale-125 transform"
                                    >
                                        X
                                    </span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
