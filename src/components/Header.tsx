import { type PropsWithChildren} from "react";
import '../KanaApp.css';
import {Link} from "react-router-dom";

interface HeaderProps {
    title: string;
}


export function Header({ children, title }: PropsWithChildren<HeaderProps>) {
    return (
        <header>
            <div className="header-title-container">
                <h1>{title}</h1>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
            <nav>
            {children}
            </nav>
        </header>
    )
}