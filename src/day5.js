import requestPromise from 'request-promise';

// TODO:
// Use GitHub API to get info about project
// Retrieve star, watch and fork count
// Handle errors
function day5(owner, repository) {
    const gitHubRepoGetUrl =
        `https://api.github.com/repos/${owner}/${repository}`;

    const requestOptions = {
        uri: gitHubRepoGetUrl,
        resolveWithFullResponse: true,
        json: true,
        headers: {
            'User-Agent': 'JavaScript Testing Beginners Course'
        }
    };

    return requestPromise.get(requestOptions)
        .then((data) => {
            return {
                forks: data.forks_count,
                stars: data.stargazers_count,
                watchers: data.watchers_count
            };
        })
        .catch((error) => {
            return {
                errorCode: error.statusCode,
                success: false,
                error: 'API request is rate limited'
            };
        });
}

export default day5;
