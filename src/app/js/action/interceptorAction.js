import { Modal } from 'antd';
export default function(err, res) {
    if (res.status == 500) {
        var result = {
            errorCode: 500,
            message: "糟糕，出问题啦，我们的工程师在全力抢修中"
        }
        Modal.error({
            title: '糟糕，出问题啦，我们的工程师在全力抢修中',
            onOk: ()=> {
            }
        });
        return result;
    } else {
        return res.body;
    }
}
