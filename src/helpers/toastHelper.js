import { toast } from 'react-toastify';

export const toastError = error => {
  // eslint-disable-next-line
  let message = null;
  if (typeof error === 'object' && error.message) ({ message } = error);
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.error(message);
  }
};

export const toastSuccess = message => {
  if (!message) return;
  toast.success(message);
};
