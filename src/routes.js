

import { Switch, Route, NavLink } from 'react-router-dom';
import Login from './login/login.js';
const Routes = (props) => {
    const data = localStorage.getItem('uid')
    console.log("dataaaaa", data);

    
        return (
            <Switch>
                <Route exact path="/" component={Login} />                
                <Route exact path="*"><NoMatch /></Route>
            </Switch>
        )

}

function NoMatch() {
    return (
        <>
            <div className='Header'>
                <center> Aca Va el Header</center>
            </div>
            <section class="page_404">
                <div>
                    <div class="four_zero_four_bg">
                        <h1>404</h1>
                    </div>
                    <div class="box_404">
                        <h3>
                            <center>Pagina No encontrada</center>
                        </h3>
                    </div>
                    <center><button className='boton404'>
                        <NavLink to={{ pathname: `/` }} style={{ textDecoration: 'none', color: '#ffffff' }}>
                            Ir al Inicio
                        </NavLink>
                    </button></center>
                </div>
            </section>
        </>

    );
}
export default Routes;
