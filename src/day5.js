import request from 'request';

function day5(owner, repository, callback) {
    const gitHubUrl = `https://api.github.com/repos/${owner}/${repository}`;

    const requestOptions = {
        uri: gitHubUrl,
        headers: {
            'User-Agent': 'JavaScript Testing For Beginners'
        },
        resolveWithFullResponse: true,
        json: true
    };

    request.get(requestOptions, (error, response, body) => {
        if (response.statusCode == 403) {
            callback({
                success: false,
                statusCode: response.statusCode,
                error: 'API is rate limited - try again later'
            })
        } else {
            callback({
                stars: body.stargazers_count
            });
        }
    });
}

export default day5;
