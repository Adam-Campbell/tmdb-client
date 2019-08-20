import { toast } from 'react-toastify';

export default {
    success(msg, options = {}) {
        return toast.success(msg, {
            ...options,
            className: 'toast-success'
        });
    },
    error(msg, options = {}) {
        return toast.success(msg, {
            ...options,
            className: 'toast-error'
        });
    },
    info(msg, options = {}) {
        return toast.success(msg, {
            ...options,
            className: 'toast-info'
        });
    }
}
