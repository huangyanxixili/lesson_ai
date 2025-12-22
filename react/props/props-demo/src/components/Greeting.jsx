import PropsTypes from 'prop-types'; // prop 类型约定，校验

// 给谁打工？
function Greeting(props) {
    // console.log(props)
    const {
        name,
        msg,
        showIcon,
    } = props;
    console.log(name, msg, props)
    return (
        <div>
            {showIcon && <span>👋</span>}
            <h1>{name}</h1>
            <p>{msg}</p>
        </div>
    )
}

Greeting.propTypes = {
    name: PropsTypes.string.isRequired,
    msg: {
        type: PropsTypes.string,
        default: '欢迎欢迎',
    },
    showIcon: PropsTypes.bool,
}

// Greeting.defaultProps = {
//     msg: 'Welcome to ByteDance',
// }

export default Greeting