// const apiKey = '$2b$10$SRPXdp9h.Sb3xtkppOn.xuSkn/BbZn9RevJdV8ipHAUYH6RJW.C6i';

const API_SERVICE = {
    status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    },
    json(response) {
        return response.json()
    },
    error(err) {
        return err;
    },
    get(path) {
        return fetch(`${path}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'token ' + apiKey
            }
        })
            .then(this.status)
            .then(this.json)
            .catch(this.error);
    },
    post(path, body) {
        return fetch(`${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'token ' + apiKey
            },
            body,
        })
            .then(this.status)
            .then(this.json)
            .catch(this.error);
    }
}

export default API_SERVICE;
