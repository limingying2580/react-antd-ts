import React, {Component} from 'react';
import {Result, Button} from 'antd'

class Page404 extends Component {
    backLast = () => {
        window.location.href = '/home'
    }
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                <Button type="primary" onClick={this.backLast}>返回首页</Button>
            }
            />
        );
    }
}

export default Page404;
