
import './homepage.scss'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div id='homepage' className='col-lg-12'>
            <button className="btn btn-success"><Link to='/manage-links' className='link'>Manage Links</Link></button>
            <button className="btn btn-primary"><Link to='/manage-mods' className='link'>Manage Mods</Link></button>
        </div>
    );
}

export default HomePage;