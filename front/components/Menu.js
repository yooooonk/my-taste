import 'antd/dist/antd.css'
import '../styles/Menu.scss'
import Link from 'next/Link';

const Menu = ()=>{

    return(        
        <div className="Menu">
            <ul>
            <li>
                <Link href="/bookSearch">
                    <a>책 검색</a>
                </Link>
            </li>
            <li>
                <Link href="/bookList">
                    <a>담은 책 </a>
                </Link>
            </li>
            <li>
                <Link href="/bookPost">
                    <a>기록</a>
                </Link>
            </li>
            </ul>
        </div>
    )
}

export default Menu;