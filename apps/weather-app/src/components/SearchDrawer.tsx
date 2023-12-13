import { Button } from "@hdoc/react-button";
import { Icon } from "@hdoc/react-material-icons";
import "./SearchDrawer.scss";

export const SearchDrawer = () => {
  return (
    <div className="search-drawer">
      <Icon name="close" className="search-drawer__close" />
      <nav className="search-drawer__search">
        <div className="input-wrapper">
          <Icon name="search" />
          <input type="text" placeholder="search location" />
        </div>
        <Button text="Search" color="primary" />
      </nav>
      <ul className="search-drawer__results">
        <li>
          London <Icon name="keyboard_arrow_right" />
        </li>
        <li>
          Barcelona <Icon name="keyboard_arrow_right" />
        </li>
        <li>
          Long Beach <Icon name="keyboard_arrow_right" />
        </li>
      </ul>
    </div>
  );
};
