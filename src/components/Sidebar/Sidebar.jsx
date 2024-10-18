import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UserPlus, ChevronRight } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import styles from './Sidebar.module.css';

function Sidebar({ isExpanded, toggleSidebar, isMobile }) {
    if (isMobile) return null;

    return (
        <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
            <div className={styles.header}>
                {isExpanded ? (
                    <>
                        <span className={styles.title}>
                            Guest Manager
                        </span>
                        <button
                            onClick={toggleSidebar}
                            className={styles.toggleButton}
                            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            <ChevronRight size={20} className={isExpanded ? styles.rotateIcon : ''} />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={toggleSidebar}
                        className={styles.toggleButton}
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
            <nav>
                <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                >
                    <div className={`${styles.navIcon} ${!isExpanded ? styles.collapsedNavIcon : ''}`}>
                        <Home size={24} />
                    </div>
                    <div className={`${styles.navText} ${isExpanded ? styles.expandedNavText : ''}`}>
                        <span className={styles.navTextContent}>Home</span>
                    </div>
                </NavLink>
                <NavLink
                    to={ROUTES.ADD_GUEST}
                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                >
                    <div className={`${styles.navIcon} ${!isExpanded ? styles.collapsedNavIcon : ''}`}>
                        <UserPlus size={24} />
                    </div>
                    <div className={`${styles.navText} ${isExpanded ? styles.expandedNavText : ''}`}>
                        <span className={styles.navTextContent}>Add Guest</span>
                    </div>
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;
