import { BASE_URL } from "./apiConstants";

export const LIBRARY_ADD_NEW_BOOK = `${BASE_URL}/api/library/books`;
export const LIBRARY_ADD_BULK_BOOK = `${BASE_URL}/api/library/bulkUploadlibrary`;
export const LIBRARY_BOOK_BORROW = `${BASE_URL}/api/library/books_borrow`;
export const LIBRARY_BOOK_PENALTY = `${BASE_URL}/api/library/books_penalty`;
export const LIBRARY_ALLOWED = `${BASE_URL}/api/library/allowed_books`;
export const LIBRARY_ALLOWED_DAYS = `${BASE_URL}/api/library/allowed_books_days`;
export const LIBRARY_SETTINGS = `${BASE_URL}/api/library/settings`;
export const LIBRARY_BORROW_SEARCH = `${BASE_URL}/api/library/book/check-borrow`;
export const LIBRARY_BORROW_LOGS = `${BASE_URL}/api/library/book-logs`;
export const LIBRARY_DASHBOARD = `${BASE_URL}/api/library/dashboard`;
export const LIBRARY_EBOOKS = `${BASE_URL}/api/library/ebooks`;
export const LIBRARY_USER_LOGS = `${BASE_URL}/api/library/userLogs`;
