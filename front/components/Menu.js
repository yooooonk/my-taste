import 'antd/dist/antd.css'
import '../styles/Menu.scss'
import Link from 'next/Link';

const Menu = ()=>{

    return(        
        <div className="Menu">
            <ul>
            <li>
                <Link href="/bookSearch">
                    <a>Search</a>
                </Link>
            </li>
            <li>
                <Link href="/bookBasket">
                    <a>Basket</a>
                </Link>
            </li>
            <li>
                <Link href="/bookPost">
                    <a>Write</a>
                </Link>
            </li>
            </ul>
        </div>
    )
}

export default Menu;