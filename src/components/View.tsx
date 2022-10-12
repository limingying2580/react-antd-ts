import React, {Component,Suspense,lazy} from 'react'; //Suspense懒加载用
import router, {unRouter} from "../router";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'
import "../static/css/login.css"
// import Login from "../pages/Login";
import MenuBars from "../pages/MenuBars";
const Login = lazy(() => import ('../pages/Login'))
// const MenuBars = lazy(() => import ('../pages/MenuBars'));

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
                        unRouter.map((item, i) => {
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
                    {
                        router.map((item, i) => {
                            return (
                                <Route key={item.key} path={item.path} element={
                                    <Suspense fallback={
                                        <div className='loading'>Loading...</div>
                                    }>
                                        <MenuBars>
                                            {item.component}
                                        </MenuBars>
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
