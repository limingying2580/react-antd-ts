import React, {Component,Suspense,lazy} from 'react'; //Suspense懒加载用
import router from "../router";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'
import "../static/css/login.css"
// import Login from "../pages/Login";
const Login = lazy(() => import ('../pages/Login'))
class View extends Component {
    render() {
        return (
            <>
               {/* <Routes>
                    <Route path='/' element={<Login/>}/>
                    {
                        router.map(r => (<Route path={r.path} key={r.key} element={r.component}/>))
                    }
                </Routes>*/}

                <Routes>
                    {
                        router.map((item, i) => {
                            return (
                                <Route key={item.key} path={item.path} element={
                                    <Suspense fallback={
                                        <div className='loading'>Loading...</div>
                                    }>
                                        {item.component}
                                    </Suspense>

                                }/>
                            )
                        })
                    }
                </Routes>
            </>
        );
    }
}

export default View;
