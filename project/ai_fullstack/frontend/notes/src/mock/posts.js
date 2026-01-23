import Mock from 'mockjs'

const tags = ["前端", "后端", "职场", "AI", "副业", "面经", "算法"];
const posts = Mock.mock({ // 根据数据模板生成随机数据
    'list|45': [ // 生成一个包含 45 个对象的数组，属性名叫 list
        {
            title: '@ctitle(8, 20)', // 生成一个随机标题，长度在 8 到 20 之间
            brief: '@ctitle(20, 100)',
            totalComments: '@integer(1, 30)',
            totalLikes: '@integer(0, 500)',
            publishedAt: '@datetime("yyyy-MM-dd HH:mm")',
            user: {
                id: '@integer(1, 100)',
                name: '@cname(2, 4)',
                avatar: '@image(300x200)',
            },
            tags: () => Mock.Random.pick(tags, 2),
            thumbnail: '@image(300x200)',
            pics: [
                '@image(300x200)',
                '@image(300x200)',
                '@image(300x200)',
            ],
            id: '@increment(1)'
        }
    ]
}).list

export default [
    {
        url: '/api/posts',
        method: 'get',
        response:({ query }, res) => {
            console.log(query, '?????')
            const { page = '1', limit = '10'} = query;
            const currentPage = parseInt(page, 10); // 强行转换 将得到的字符串强转为 int，并且设定为 10进制
            const size = parseInt(limit, 10);

            if (isNaN(currentPage) || isNaN(size) || currentPage < 1 || size < 1) { // isNaN 检查转换后的是不是有效数字
                return {
                    code: 400,
                    msg: 'Invalid page or pageSize',
                    data: null
                }
            }

            const total = posts.length; // count
            const start = (currentPage - 1) * size // 分页偏移量，前面 (currentPage-1) 页的所有数据
            const end = start + size;
            const paginatedData = posts.slice(start, end); // 从 start 开始，截取 end - start 个元素

            return {
                code: 200,
                msg: 'success',
                items: paginatedData,
                pagination: {
                    current: currentPage,
                    limit: size,
                    total,
                    totalPage: Math.ceil(total/size)
                }
            }
        }
    }
]