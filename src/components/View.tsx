import React, {Component,Suspense} from 'react'; //Suspense懒加载用
import router from "../router";
import Login from "../pages/Login";

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom'

class View extends Component {
    render() {
        return (
            <>
                <Routes>
                  {/*  <Suspense fallback={<></>}>*/}
                        {
                            router.map(r => (<Route path={r.path} key={r.key} element={r.component}/>))
                        }
                     {/*   <Route path={'/login'} element={<Login/>}/>*/}
                    {/*</Suspense>*/}
                </Routes>
            </>
        );
    }
}

export default View;
