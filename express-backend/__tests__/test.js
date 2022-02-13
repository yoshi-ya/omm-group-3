const request = require("supertest");
const server = 'http://localhost:5001'

// ID of the meme used to test
const testId = '6202a0ea093088997f95b710'
const testUser = 'Test User'
const testComment = 'This is a test comment'

describe('Test if we get any memes at all', () => {
    it('GET /allMemes result length is greater than 0', () => {
        request(server).get('/allMemes').end((error, res) => {
            if (error) {
                throw error
            } else {
                expect(res.body.length).toBeGreaterThan(0);
            }
        })
    })
});

describe('Test getting one single meme with specific ID', () => {
    it(`GET /fetchMeme with test ID ${testId}`, () => {
        request(server).get(`/fetchMeme?id=${testId}`).end((error, res) => {
            if (error) {
                throw error
            } else {
                expect(res.body._id).toBe(testId);
            }
        })
    })
});

describe('Test adding a like to Meme', () => {
    it(`POST /addLike to Meme with test ID ${testId}`, async () => {
        let oldVotes
        let numberOfVotes

        await request(server).get(`/fetchMeme?id=${testId}`).then((result) => {
            oldVotes = result.body.votes
            numberOfVotes = result.body.votes.length
            request(server).post(`/addLike`, {
                id: testId, votes: [...oldVotes, testUser]
            }).end((error, res) => {
                if (error) {
                    throw error
                } else {
                    if (res.body.votes) {
                        expect(res.body.votes.length).toBe(numberOfVotes + 1)
                    }
                }
            })
        })
    })
});


describe('Test adding a comment to Meme', () => {
    it(`POST /addComment to Meme with test ID ${testId}`, async () => {
        let commentData = {
            'meme': testId, 'author': testUser, 'content': testComment
        }

        let numberOfComments = 0
        await request(server).get(`/allComments?meme=${testId}`).then(async (result) => {
            numberOfComments = result.body.length
            await request(server).post(`/addComment`).send(commentData).then(() => {
                request(server).get(`/allComments?meme=${testId}`).end((error, res) => {
                    if (error) {
                        throw error
                    } else {
                        expect(res.body.length).toBe(numberOfComments + 1)
                    }
                })
            })
        })
    })
})

describe('Test deleting a comment of Meme', () => {
    it('DELETE /deleteComment deletion of added test comment', async () => {
        await request(server).get(`/allComments?meme=${testId}`).then(async (result) => {
            let numberOfComments = result.body.length
            await request(server).delete('/deleteComment').send({
                comment: testComment
            }).then(() => {
                request(server).get(`/allComments?meme=${testId}`).end((error, res) => {
                    if (error) {
                        throw error
                    } else {
                        expect(res.body.length).toBe(numberOfComments - 1)
                    }
                })
            })
        })
    })
})

