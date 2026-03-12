// exec 执行命令的 tool
import {
    spawn // 生成
} from 'node:child_process' // node 内置模块（高级）新建一个子进程
/*
进程：分配资源的最小单位（资源）
    - 主进程：node node-exec.mjs
线程：是执行的最小单位（执行）
不好在主线程中执行 npm i / npm run dev / npm init vite，会堵塞主进程，适合单独开一个进程单独去跑
cmd 本身就是进程，所以就拆分成 父子进程，让子进程去跑这些命令，并且执行完后回收
node 虽然是单线程执行JS，但是是“多进程架构”
*/

// bash 命令
// git bash
const command = 'ls -la';
// 新建一个子进程
const [
    cmd,    // 需要执行的命令
    ...args // 传输给命令的参数
] = command.split(' ');
const cwd = process.cwd();
console.log(`当前工作目录：${cwd}`)

// 并发执行
const child = spawn(cmd, args, { // 任务的描述对象
    cwd, 
    // 继承父进程的输入输出流 stdin输入 stdout输出
    stdio: 'inherit', 
    // 通过系统的 shell 来执行命令
    shell: true
})

// 进程间的通信 基于事件
let errorMsg = '';
child.on('error', (error) => {
    errorMsg = error.message;
})

child.on('close', (code) => {
    if (code === 0) {
        // 成功退出
        console.log('命令执行成功，子进程退出');
        process.exit(0);
    } else {
        if (errorMsg) {
            console.error(`错误：${errorMsg}`);
        }
        process.exit(code || 1);
    }
})