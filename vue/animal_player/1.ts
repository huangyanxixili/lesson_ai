const random = (start: number, end: number) => {
    // 生成一个 [0, 1) 之间的随机数
    const p = Math.random(); 
    // 线性插值 + 向下取整
    return Math.floor(start * (1 - p) + end * p); 
    // start * (1 - p) + end * p 只会让数据居于[start, end)之间
    // 再向下取整使数据只为整数并且小于end
}

async function main({ params }: Args): Promise<Output> {
    if (params.position == null) params.position = random(0, 3);
    if (params.shooting_hand == null) params.shooting_hand = random(0, 2);

    const style = params.style || '写实';
    const uniform_number:string = (params.uniform_number || 10).toString();
    const uniform_color = params.uniform_color || '红';
    const position = params.position  == 0 ? '守门员': (params.position == 1 ? '前锋': '后卫');
    const shooting_hand = params.shooting_hand == 0 ? '左手': '右手';

    // 构建输出对象
    const ret = {
        style,
        uniform_number,
        uniform_color,
        position,
        shooting_hand,
    };

    return ret;
}