
export function handleResponse(response) {
    return response;
}


export function handleError(error) {
    var { response } = error;
    if (typeof response === 'undefined') {
        response = [];
    }
    if (typeof response.data === 'undefined' || response.data === null || response.data === '') {
        response.data.data = [];
    }
    response.data.isSuccess = false;
    if (typeof response.data.message === 'undefined' || response.data.message === null || response.data.message === '') {
        response.data.message = 'Something went wrong';
    }
    if ((response.status === 401 && response.statusText === 'Unauthorized') || (response.status === 401 && response.data.message === 'Unauthenticated.')) {
        sessionStorage.clear();
        // window.location.href = '/login';
        return;
    } else {
        return response;
    }

}