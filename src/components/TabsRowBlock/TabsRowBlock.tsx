import { NavLink, useLocation } from 'react-router-dom';
import { isActiveNavLink } from '../../helpers/helpers';
import MyButton from '../common/MyButton/MyButton';
import cl from './TabsRowBlock.module.scss';

/* ------------- Types ------------- */
interface TabsRowBlockProps {
  firstTab: [name: string, path: string];
  secondTab: [name: string, path: string];
  totalCount?: number;
  buttons?: [callback: () => void, name: string];
}

/* ------------- Component ------------- */
const TabsRowBlock: React.FC<TabsRowBlockProps> = ({ firstTab, secondTab, totalCount, buttons }) => {
  const location = useLocation();
  const isFirstTab = location.pathname === firstTab[1];

  const ButtonComponent = buttons && (
    <div className={cl.buttonContainer}>
      <MyButton callBack={buttons[0]}>{buttons[1]}</MyButton>
    </div>
  );

  return (
    <div className={cl.tabs}>
      <div className={cl.tabsRow}>
        <NavLink to={firstTab[1]} end className={isActiveNavLink(cl.tabItem, cl.active)}>
          <span>{firstTab[0] + ' '}</span>
          {isFirstTab && <span className={cl.totalCount}>{totalCount}</span>}
        </NavLink>
        <NavLink to={secondTab[1]} end className={isActiveNavLink(cl.tabItem, cl.active)}>
          <span>{secondTab[0] + ' '}</span>
          {!isFirstTab && <span className={cl.totalCount}>{totalCount}</span>}
        </NavLink>
      </div>
      {ButtonComponent}
    </div>
  );
};

export default TabsRowBlock;
