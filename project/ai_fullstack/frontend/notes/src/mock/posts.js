export default [
    {
        url: '/api/posts',
        method: 'get',
        response:(req, res) => {
            return {
                code: 200,
                list: [
                    {
                        id: 1,
                        title: 'haha~~~'
                    }
                ]
            }
        }
    }
]