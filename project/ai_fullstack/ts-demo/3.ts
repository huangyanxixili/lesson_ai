// 把 ts 当成 js 来写
function getArea(width: number, height: number): number {
    let area: number = width * height;
    return area;
}

const area = getArea(10, 5);
console.log(area);
