// this logger is used to log in specific format for monitoring dashboard
export const log = (level: log_levels, label: string, details?: any): void => {
  const log_object = {
    level,
    label,
    details,
  };
  console.log(JSON.stringify(log_object));
};

export enum log_levels {
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export const log_labels = {
  api_request: {
    get: 'API_REQUEST_GET',
    post: 'API_REQUEST_POST',
    patch: 'API_REQUEST_PATCH',
    patch_success: 'API_REQUEST_PATCH_SUCCESS',
    patch_failure: 'API_REQUEST_PATCH_FAILURE',
    delete_success: 'API_REQUEST_DELETE_SUCCESS',
    delete_failure: 'API_REQUEST_DELETE_FAILURE',
    unexpected_status_code: 'API_REQUEST_RESPONSE_UNEXPECTED_STATUS_CODE',
    get_success: 'API_REQUEST_GET_SUCCESS',
    get_failure: 'API_REQUEST_GET_FAILURE',
    post_success: 'API_REQUEST_POST_SUCCESS',
    post_failure: 'API_REQUEST_POST_FAILURE',
    format_error: 'API_REQUEST_RESPONSE_INVALID_FORMAT',
    start_rejected: 'API_REQUEST_START_REJECTED',
    stop_rejected: 'API_REQUEST_STOP_REJECTED',
    payment: {
      authorize_payment_failure: 'API_REQUEST_AUTHORIZE_PAYMENT_FAILURE',
      settle_payment_failure: 'API_REQUEST_SETTLE_PAYMENT_FAILURE',
      cancel_payment_failure: 'API_REQUEST_CANCEL_PAYMENT_FAILURE',
    },
  },
  modules: {
    operation_failed: 'OPERATION_FAILED',
    receipts: {
      enable_blocked_user_failed: 'MODULE_RECEIPT_ENABLE_BLOCKED_USER_FAILED',
      forward_to_spw_failed: 'MODULE_RECEIPT_FORWARD_TO_SPRINGWORKS_FAILED',
      forward_to_spw_success: 'MODULE_RECEIPT_FORWARD_TO_SPRINGWORKS_SUCCESS',
      transaction_success: 'TRANSACTION_SUCCESS',
      amount_too_high: 'MODULE_RECEIPT_AMOUNT_TOO_HIGH',
    },
  },
  db: {
    connect_success: 'DB_CONNECT',
    connect_error: 'DB_CONNECT_ERROR',
    format_error: 'FORMAT_ERROR',
    upsert_fun_fact: 'UPSERT_FUN_FACT',
    update_fun_fact: 'UPDATE_FUN_FACT',
    delete_fun_fact: 'DELETE_FUN_FACT',
  },
};
